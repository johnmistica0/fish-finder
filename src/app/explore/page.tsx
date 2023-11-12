"use client"

import { Button } from "@/components/ui/button";
import { LocateFixed, X } from "lucide-react";
import { Ref, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import CatchInfoCard, { HoverCardDemo } from "@/components/CatchInfoCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Position, useMapContext } from "@/components/context/MapContext";
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker, MapRef, Popup } from 'react-map-gl';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";

enum MapTypes {
  DARK = 'mapbox://styles/johnmistica0/clousxn6q00mk01ntbw5n323k',
  LIGHT = 'mapbox://styles/johnmistica0/clout1ex200me01pef84yfwie',
  TERRAIN = 'mapbox://styles/johnmistica0/clout3ozt00mn01qj3xqs3p7h',
  SATELLITE = 'mapbox://styles/johnmistica0/clout47fo00ml01nth9h736up'
}

export default function Home() {
  const { theme } = useTheme()
  const [mapStyle, setMapStyle] = useState<string>('')
  const [open, setOpen] = useState(false)
  const [disableMarker, setDisableMarker] = useState(false)
  const { position, currentLocation, setCurrentLocation } = useMapContext()
  const mapRef = useRef<MapRef>()
  const initialViewState = {
    longitude: position.lng,
    latitude: position.lat,
    zoom: 15
  }

  const setThemeMapStyle = (value: string) => {
    if (value === 'map') {
      if (theme === 'dark') {
        setMapStyle(MapTypes.DARK)
      } else if (theme === 'light') {
        setMapStyle(MapTypes.LIGHT)

      } else if (theme === 'system') {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          setMapStyle(MapTypes.DARK)
        } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
          setMapStyle(MapTypes.LIGHT)
        }
      }
    } else if (value === 'satellite') {
      setMapStyle(MapTypes.SATELLITE)
    } else if (value === 'terrain') {
      setMapStyle(MapTypes.TERRAIN)
    }
  }

  useEffect(() => {
    setThemeMapStyle('map')
  }, [theme])


  useEffect(() => {
    mapRef.current?.flyTo({ center: [position.lng, position.lat] })
  }, [position])

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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setCurrentLocation({ lat: latitude, lng: longitude })
          const timeoutId = setTimeout(() => {
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
    if (currentLocation.lat !== 0 && currentLocation.lng !== 0) {
      mapRef.current?.setCenter([currentLocation.lng, currentLocation.lat])
    }
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
      <div className="col-span-3 relative">
        <Map
          reuseMaps
          ref={mapRef as Ref<MapRef>}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
          initialViewState={initialViewState}
          styleDiffing={false}
          mapStyle={mapStyle ?? ''}
          attributionControl={false}
        >
          <Marker longitude={position.lng} latitude={position.lat} anchor="bottom" onClick={handleMarkerClick} style={{ cursor: 'pointer' }}>
            <CatchInfoCard open={open} closeClickHandler={handleCloseInfoCard}>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            </CatchInfoCard>
          </Marker>
          {currentLocation.lat !== 0 && currentLocation.lng !== 0 &&
            <Marker longitude={currentLocation.lng} latitude={currentLocation.lat} anchor="bottom">
              <TooltipProvider delayDuration={150}>
                <Tooltip>
                  <TooltipTrigger className="cursor-default">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Current Location</p>
                    <TooltipArrow className="fill-white dark:fill-slate-950"/>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Marker>}
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
      </div>
    </main>
  );
}

