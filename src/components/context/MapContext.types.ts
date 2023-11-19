import { StaticImageData } from "next/image";
import { RefObject } from "react";
import { MapRef } from "react-map-gl";
import type { Geometry } from 'geojson';

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
  directionsData: DirectionsResponse | null;
  setDirectionsData: (newDirectionsData: DirectionsResponse | null) => void;
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

export interface DirectionsResponse {
  routes: {
    weight_name: string;
    weight: number;
    duration: number;
    distance: number;
    legs: {
      via_waypoints: never[];
      admins: {
        iso_3166_1_alpha3: string;
        iso_3166_1: string;
      }[];
      weight: number;
      duration: number;
      steps: never[];
      distance: number;
      summary: string;
    }[];
    geometry: Geometry;
  }[];
  waypoints: {
    distance: number;
    name: string;
    location: [number, number];
  }[];
  code: string;
  uuid: string;
  message: string;
}
