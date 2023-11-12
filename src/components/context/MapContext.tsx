"use client"

import { useTheme } from "next-themes";
import { createContext, useContext, useEffect, useState } from "react";

enum MapTypes {
  DEFAULT = 'mapbox://styles/mapbox/streets-v9',
  DARK = 'mapbox://styles/johnmistica0/clousxn6q00mk01ntbw5n323k',
  LIGHT = 'mapbox://styles/johnmistica0/clout1ex200me01pef84yfwie',
  TERRAIN = 'mapbox://styles/johnmistica0/clout3ozt00mn01qj3xqs3p7h',
  SATELLITE = 'mapbox://styles/johnmistica0/clout47fo00ml01nth9h736up'
}

export interface Position {
  lat: number;
  lng: number;
}

export interface MapContextType {
  position: Position;
  setPosition: (newPosition: Position) => void;
  currentLocation: Position;
  setCurrentLocation: (newCurrentLocation: Position) => void;
  mapStyle: string;
  setThemeMapStyle: (newThemeMapStyle: string) => void;
}

const MapContext = createContext<MapContextType | null>(null);

export function MapContextWrapper({children}: any) {
  const { theme } = useTheme()
  const [position, setPosition] = useState<Position>({ lat: 30.393951, lng: -97.728304 })
  const [currentLocation, setCurrentLocation] = useState<Position>({lat: 0, lng: 0})
  const [mapStyle, setMapStyle] = useState<string>(MapTypes.DEFAULT)

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

  return (
    <MapContext.Provider value={{position, setPosition, currentLocation, setCurrentLocation, mapStyle, setThemeMapStyle} as MapContextType}>
      {children}
    </MapContext.Provider>
  );
}

export function useMapContext() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapContext must be used within a MapContextProvider");
  }
  return context;
}