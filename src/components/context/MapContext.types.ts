import { StaticImageData } from "next/image";
import { RefObject } from "react";
import { MapRef } from "react-map-gl";

export enum MapTypes {
  DEFAULT = 'mapbox://styles/mapbox/streets-v9',
  DARK = 'mapbox://styles/johnmistica0/clousxn6q00mk01ntbw5n323k',
  LIGHT = 'mapbox://styles/johnmistica0/clout1ex200me01pef84yfwie',
  TERRAIN = 'mapbox://styles/johnmistica0/clout3ozt00mn01qj3xqs3p7h',
  SATELLITE = 'mapbox://styles/johnmistica0/clout47fo00ml01nth9h736up'
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface MapContextType {
  mapPosition: Coordinates;
  setMapPosition: (newMapPosition: Coordinates) => void;
  userLocation: Coordinates;
  setUserLocation: (newCurrentLocation: Coordinates) => void;
  mapStyle: string;
  setMapStyle: (newMapStyle: string) => void;
  markerData: CatchData[];
  setMarkerData: (newMarkerData: CatchData[]) => void;
  mapRef: RefObject<MapRef>;
}

export interface CatchData {
  id: string;
  coordinates: Coordinates;
  location: string;
  species: string;
  image: StaticImageData;
  icon: StaticImageData;
  lure: string;
  weight: string;
  username: string;
  date: string;
}
