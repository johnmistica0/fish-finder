import { Button } from "@/components/ui/button";
import { LocateFixed } from "lucide-react";
import { Ref, useEffect, useRef, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMapContext } from "@/components/context/MapContext";
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { MapRef } from 'react-map-gl';
import CatchMarker from "./CatchMarker";
import LocationMarker from "./LocationMarker";



export default function MapContainer() {
  const { position, currentLocation, setCurrentLocation, mapStyle, setThemeMapStyle} = useMapContext()
  const currentLocationValid = currentLocation.lat !== 0 && currentLocation.lng !== 0
  const mapRef = useRef<MapRef>()
  const initialViewState = {
    longitude: position.lng,
    latitude: position.lat,
    zoom: 15
  }

  useEffect(() => {
    mapRef.current?.flyTo({ center: [position.lng, position.lat] })
  }, [position])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setCurrentLocation({ lat: latitude, lng: longitude })
          setTimeout(() => {
            mapRef.current?.setCenter([longitude, latitude])
          }, 100);
        },
        (err) => {
          console.error(err)
        }
      )
    }
  }, []);

  const gotoCurrentLocation = () => {
    if (currentLocationValid) {
      mapRef.current?.setCenter([currentLocation.lng, currentLocation.lat])
    }
  }

  return (
    <>
      <Map
        reuseMaps
        ref={mapRef as Ref<MapRef>}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
        initialViewState={initialViewState}
        styleDiffing={false}
        mapStyle={mapStyle}
        attributionControl={false}
      >
        <CatchMarker location={position} />
        {currentLocationValid && <LocationMarker location={currentLocation} />}
      </Map>
      <div className="absolute top-0 left-0 p-5 z-10">
        <Tabs defaultValue="map" onValueChange={setThemeMapStyle}>
          <TabsList>
            <TabsTrigger value="map">Minimal</TabsTrigger>
            <TabsTrigger value="terrain">Terrain</TabsTrigger>
            <TabsTrigger value="satellite">Satellite</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="absolute bottom-0 right-0 p-5 z-10">
        <Button size="icon" variant="outline" onClick={gotoCurrentLocation}>
          <LocateFixed />
        </Button>
      </div>
    </>
  )
}