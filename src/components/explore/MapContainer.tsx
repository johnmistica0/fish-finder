import { Button } from "@/components/ui/button";
import { LocateFixed } from "lucide-react";
import { Ref, useEffect, useRef, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMapStyle, useMapContext } from "@/components/context/MapContext";
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { MapRef } from 'react-map-gl';
import CatchMarker from "./CatchMarker";
import LocationMarker from "./LocationMarker";
import { FaLocationArrow } from "react-icons/fa";
import { useTheme } from "next-themes";
import { CatchData } from "../context/MapContext.types";

export default function MapContainer() {
  const { theme } = useTheme()
  const { mapPosition, userLocation, mapStyle, setMapStyle, mapRef, markerData } = useMapContext()

  const initialViewState = {
    longitude: mapPosition.lng,
    latitude: mapPosition.lat,
    zoom: 15
  }

  const gotoCurrentLocation = () => {
    if (userLocation.lat !== 0) {
      mapRef?.current?.setCenter([userLocation.lng, userLocation.lat])
      mapRef?.current?.setZoom(15)
    }
  }

  const renderMarkers = () => markerData.map((data: CatchData) => {
    return <CatchMarker key={data.id} location={{ lat: data.coordinates.lat, lng: data.coordinates.lng }}/>
  })

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
        {markerData.length !== 0 && renderMarkers()}
        {userLocation.lat !== 0 && <LocationMarker location={userLocation} />}
      </Map>
      <div className="absolute top-0 left-0 p-5 z-10">
        <Tabs defaultValue="map" onValueChange={(value) => setMapStyle(getMapStyle(value, theme))}>
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
    </>
  )
}