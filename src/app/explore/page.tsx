"use client"

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useAdvancedMarkerRef,
  useAutocomplete,
  useApiIsLoaded,
} from "@vis.gl/react-google-maps"
import CatchInfoCard from "@/components/CatchInfoCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

enum MapType {
  ROADMAP = 'roadmap',
  SATELLITE = 'satellite'
}

export default function Home() {
  const [mapType, setMapType] = useState(MapType.ROADMAP)
  const [open, setOpen] = useState(false)
  const [disableMarker, setDisableMarker] = useState(false)
  const [markerRef, marker] = useAdvancedMarkerRef();
  const { theme } = useTheme()
  const position = { lat: 30.393951, lng: -97.725604 }
  const mapOptions = {
    zoom: 14,
    disableDefaultUI: true,
    mapId: theme === 'dark' ? process.env.NEXT_PUBLIC_DARK_MAP_ID : process.env.NEXT_PUBLIC_LIGHT_MAP_ID
  }

  const handleMarkerClick = () => {
    if (!disableMarker) {
      setOpen(true)
    }
  }

  const handleCloseInfoCard = () => {
    setDisableMarker(true)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) {
      setDisableMarker(false)
    }
  }, [open])

  return (
    <main className="grid grid-cols-4 h-[calc(100vh-64px)]">
      <div className="col-span-1 flex flex-col p-5">
        <div className="flex flex-row justify-between items-center">
          <p className="text-lg font-semibold">Catches Near You</p>
          <Button variant="ghost" size="icon">
            <X />
          </Button>
        </div>
      </div>
      <div className="col-span-3 relative">
          <Map center={position} mapTypeId={mapType as string} {...mapOptions}>
            <AdvancedMarker ref={markerRef} position={position} onClick={handleMarkerClick}>
              <CatchInfoCard open={open} closeClickHandler={handleCloseInfoCard}>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </span>
              </CatchInfoCard>
            </AdvancedMarker>
          </Map>
        <div className="absolute top-0 left-0 p-5 z-10">
          <Tabs defaultValue="roadmap" className="w-[400px]" onValueChange={(value) => setMapType(value as MapType)}>
            <TabsList>
              <TabsTrigger value="roadmap">Map</TabsTrigger>
              <TabsTrigger value="satellite">Satellite</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </main>
  );
}

