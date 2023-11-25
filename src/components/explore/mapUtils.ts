import { MapTypes } from "./mapSlice"
import randomLocation from "random-location";

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

export const getRandomCoordinate = (lat: number, lng: number) => randomLocation.randomCirclePoint({ latitude: lat, longitude: lng }, 10000)