import { Button } from "@/components/ui/button";
import { Ref, useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMapContext } from "@/components/context/MapContext";
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { MapRef } from 'react-map-gl';
import CatchMarker from "./CatchMarker";
import LocationMarker from "./LocationMarker";
import { FaLocationArrow } from "react-icons/fa";
import { useTheme } from "next-themes";
import DirectionsLayer from "./DirectionsLayer";
import DirectionsCard from "./DirectionsCard";
import fishImage from '@/assets/fish.jpg'
import fishIcon from '@/assets/fish-icon.png'
import { getMapStyle, getRandomCoordinate } from "./mapUtils";
import { CatchData, Coordinates, selectMapPosition, selectMapStyle, selectMarkerData, selectUserLocation, setMapStyle, setMarkerData, setUserLocation } from "./mapSlice";
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from "@/app/hooks";

export default function MapContainer({ mapContainerRef }: any) {
  const { theme } = useTheme()
  const { mapRef } = useMapContext()
  const userLocation = useAppSelector(selectUserLocation)
  const mapPosition = useAppSelector(selectMapPosition)
  const markerData = useAppSelector(selectMarkerData)
  const mapStyle = useAppSelector(selectMapStyle)
  const dispatch = useAppDispatch()

  const initialViewState = {
    longitude: userLocation !== null ? userLocation.lng : mapPosition.lng,
    latitude: userLocation !== null ? userLocation.lat : mapPosition.lat,
    zoom: 15
  }

  useEffect(() => {
    dispatch(setMapStyle(getMapStyle('map', theme)))
  }, [theme])

  useEffect(() => {
    mapRef?.current?.flyTo({ center: [mapPosition.lng, mapPosition.lat] })
  }, [mapPosition])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          dispatch(setUserLocation({ lat: latitude, lng: longitude }))
          setTimeout(() => {
            mapRef?.current?.setCenter([longitude, latitude])
          }, 300)
        },
        (err) => {
          console.error(err)
        }
      )
    }
  }, []);

  const setMarkerDataFromLocation = (location: Coordinates) => {
    dispatch(setMarkerData(Array.from({ length: 40 }, () => {
      const { longitude, latitude } = getRandomCoordinate(location.lat, location.lng)
      return {
        id: uuidv4(),
        coordinates: { lng: longitude, lat: latitude },
        location: "Lake Travis, TX",
        species: "Largemouth Bass",
        image: fishImage,
        icon: fishIcon,
        lure: "Crankbait",
        weight: "3 lb 5oz",
        username: "john_mistica",
        date: "Dec 2, 2021"
      } as CatchData
    })))
  }

  useEffect(() => {
    setMarkerDataFromLocation(userLocation ?? mapPosition)
  }, [userLocation]);

  const gotoCurrentLocation = () => {
    if (userLocation !== null) {
      mapRef?.current?.setCenter([userLocation.lng, userLocation.lat])
      mapRef?.current?.setZoom(15)
    }
  }

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      window.dispatchEvent(new Event('resize'));
    });
    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, [mapContainerRef]);

  const renderMarkers = () => markerData.map((data: CatchData) => {
    return <CatchMarker key={data.id} location={{ lat: data.coordinates.lat, lng: data.coordinates.lng }} />
  })

  return (
    <>
      <Map
        style={{ width: '100%', height: '100%' }}
        reuseMaps
        ref={mapRef as Ref<MapRef>}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
        initialViewState={initialViewState}
        styleDiffing={false}
        mapStyle={mapStyle}
        attributionControl={false}
      >
        <DirectionsLayer />
        {markerData.length !== 0 && renderMarkers()}
        {userLocation !== null && <LocationMarker location={userLocation} />}
      </Map>
      <div className="absolute top-0 left-0 p-5 z-10">
        <Tabs defaultValue="map" onValueChange={(value) => dispatch(setMapStyle(getMapStyle(value, theme)))}>
          <TabsList>
            <TabsTrigger value="map">Minimal</TabsTrigger>
            <TabsTrigger value="terrain">Terrain</TabsTrigger>
            <TabsTrigger value="satellite">Satellite</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="absolute bottom-0 right-0 p-5 z-10">
        <Button size="icon" variant="outline" onClick={gotoCurrentLocation}>
          <FaLocationArrow />
        </Button>
      </div>
      {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="bg-white w-3 h-3 rounded-full"></div>
      </div> */}
      <DirectionsCard />
    </>
  )
}