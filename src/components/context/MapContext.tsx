"use client"

import { createContext, useContext, useRef } from "react";
import { MapContextType } from "./MapContext.types";
import { MapRef } from "react-map-gl";

const MapContext = createContext<MapContextType | null>(null);

export function MapContextWrapper({ children }: any) {
  const mapRef = useRef<MapRef>()

  return (
    <MapContext.Provider value={
      {
        mapRef
      } as MapContextType}>
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