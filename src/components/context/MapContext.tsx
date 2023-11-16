"use client"

import { useTheme } from "next-themes";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { MapContextType, MapTypes, Coordinates, CatchData } from "./MapContext.types";
import { MapRef } from "react-map-gl";
import randomLocation from "random-location";
import { v4 as uuidv4 } from 'uuid';
import fishImage from '@/assets/fish.jpg'
import fishIcon from '@/assets/fish-icon.png'

export const getMapStyle = (value: string, theme: string | undefined) => {
  if (value === 'map') {
    if (theme === 'dark') {
      return MapTypes.DARK
    } else if (theme === 'light') {
      return MapTypes.LIGHT

    } else if (theme === 'system') {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return MapTypes.DARK
      } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        return MapTypes.LIGHT
      }
    }
  } else if (value === 'satellite') {
    return MapTypes.SATELLITE
  } else if (value === 'terrain') {
    return MapTypes.TERRAIN
  }
  return MapTypes.DEFAULT
}

const MapContext = createContext<MapContextType | null>(null);

export function MapContextWrapper({ children }: any) {
  const { theme } = useTheme()
  const [mapPosition, setMapPosition] = useState<Coordinates>({ lat: 30.425803, lng: -97.934957 })
  const [userLocation, setUserLocation] = useState<Coordinates>({ lat: 0, lng: 0 })
  const [markerData, setMarkerData] = useState<CatchData[]>([])
  const [mapStyle, setMapStyle] = useState<string>(MapTypes.DEFAULT)
  const mapRef = useRef<MapRef>()

  const getRandomCoordinate = (lat: number, lng: number) => randomLocation.randomCirclePoint({ latitude: lat, longitude: lng }, 2500)

  useEffect(() => {
    setMapStyle(getMapStyle('map', theme))
  }, [theme])

  useEffect(() => {
    mapRef?.current?.flyTo({ center: [mapPosition.lng, mapPosition.lat] })
  }, [mapPosition])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation({ lat: latitude, lng: longitude })
        },
        (err) => {
          console.error(err)
        }
      )
    }
  }, []);

  useEffect(() => {
    if (userLocation.lat !== 0 && userLocation.lng !== 0) {
      setMarkerData(Array.from({ length: 20 }, () => {
        const { longitude, latitude } = getRandomCoordinate(userLocation.lat, userLocation.lng)
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
      }))
      mapRef?.current?.setCenter([userLocation.lng, userLocation.lat])
      mapRef?.current?.setZoom(15)
    } else {
      setMarkerData(Array.from({ length: 20 }, () => {
        const { longitude, latitude } = getRandomCoordinate(mapPosition.lat, mapPosition.lng)
        return {
          id: uuidv4(),
          coordinates: { lng: longitude, lat: latitude },
          location: "Lake Travis, TX",
          species: "Largemouth Bass",
          image: fishImage,
          icon: fishIcon,
          lure: "Crankbait",
          weight: "3 Ib 5oz",
          username: "john_mistica",
          date: "Dec 2, 2021"
        } as CatchData
      }))
    }
  }, [userLocation]);

  return (
    <MapContext.Provider value={{ mapPosition, setMapPosition, userLocation, setUserLocation, mapStyle, setMapStyle, markerData, setMarkerData, mapRef } as MapContextType}>
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