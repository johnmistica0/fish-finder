"use client"

import { createContext, useContext, useState } from "react";

export interface Position {
  lat: number;
  lng: number;
}

export interface MapContextType {
  position: Position;
  setPosition: (newPosition: Position) => void;
}

const MapContext = createContext<MapContextType | null>(null);

export function MapContextWrapper({children}: any) {
  const [mapContext, setMapContext] = useState<MapContextType>({
    position: { lat: 30.393951, lng: -97.725604 },
    setPosition: (newPosition: Position) => {
      setMapContext((prev) => ({ ...prev, position: newPosition }));
    },
  });

  return (
    <MapContext.Provider value={mapContext}>
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