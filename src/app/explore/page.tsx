"use client"

import { Button } from "@/components/ui/button";
import { FishSymbol, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import CardWithForm from "@/components/CardWithForm";
import CatchInfoCard from "@/components/CatchInfoCard";


export default function Home() {
  const position = { lat: 30.393951, lng: -97.725604 }
  const { theme } = useTheme()
  const options = {
    zoom: 14,
    controlSize: 30,
    fullscreenControl: false,
    streetViewControl: false,
    mapId: theme === 'dark' ? process.env.NEXT_PUBLIC_DARK_MAP_ID : process.env.NEXT_PUBLIC_LIGHT_MAP_ID,
  }
  const [mapOptions, setMapOptions] = useState(options)
  const [mapKey, setMapKey] = useState(1);
  const [open, setOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();

  useEffect(() => {
    setMapOptions((prevState) => ({
      ...prevState,
      mapId: theme === 'dark' ? process.env.NEXT_PUBLIC_DARK_MAP_ID : process.env.NEXT_PUBLIC_LIGHT_MAP_ID
    }));
    setMapKey((prevKey) => prevKey + 1);
  }, [theme]);

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
          <Map key={mapKey} center={position} {...mapOptions}>
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
