import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { StaticImageData } from "next/image";
import { RefObject, useRef } from "react";
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
      steps: any[];
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

// Define a type for the slice state
interface CounterState {
  mapPosition: Coordinates;
  userLocation: Coordinates | null;
  mapStyle: string;
  markerData: CatchData[];
  directionsData: DirectionsResponse | null;
}

// Define the initial state using that type
const initialState: CounterState = {
  mapPosition: { lat: 30.425803, lng: -97.934957 },
  userLocation: null,
  mapStyle: MapTypes.DEFAULT,
  markerData: [],
  directionsData: null,
}

export const mapSlice = createSlice({
  name: 'map',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setMapPosition: (state, action: PayloadAction<Coordinates>) => {
      state.mapPosition = action.payload
    },
    setUserLocation: (state, action: PayloadAction<Coordinates>) => {
      state.userLocation = action.payload
    },
    setMapStyle: (state, action: PayloadAction<MapTypes>) => {
      state.mapStyle = action.payload
    },
    setMarkerData: (state, action: PayloadAction<CatchData[]>) => {
      state.markerData = action.payload
    },
    setDirectionsData: (state, action: PayloadAction<DirectionsResponse | null>) => {
      state.directionsData = action.payload
    }
  },
})

export const { setMapPosition, setUserLocation, setMapStyle, setMarkerData, setDirectionsData } = mapSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectMapPosition = (state: RootState) => state.map.mapPosition
export const selectUserLocation = (state: RootState) => state.map.userLocation
export const selectMapStyle = (state: RootState) => state.map.mapStyle
export const selectMarkerData = (state: RootState) => state.map.markerData
export const selectDirectionsData = (state: RootState) => state.map.directionsData

export default mapSlice.reducer