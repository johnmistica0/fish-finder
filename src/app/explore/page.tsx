"use client"

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps"
import CatchInfoCard from "@/components/CatchInfoCard";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const {theme} = useTheme()
  const position = { lat: 30.393951, lng: -97.725604 }
  const mapOptions = {
    zoom: 14,
    controlSize: 30,
    fullscreenControl: false,
    streetViewControl: false,
    mapId: theme === 'dark' ? process.env.NEXT_PUBLIC_DARK_MAP_ID : process.env.NEXT_PUBLIC_LIGHT_MAP_ID
  }

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
      <div className="col-span-3">
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}>
          <Map center={position} {...mapOptions}>
            <AdvancedMarker ref={markerRef} position={position}>
              {open ? 
              <CatchInfoCard closeClickHandler={() => {setOpen(false)}}/> : 
              <span className="relative flex h-3 w-3" onClick={() => setOpen(true)}>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
              </span>}
            </AdvancedMarker>
          </Map>
        </APIProvider>
      </div>
    </main>
  );
}
