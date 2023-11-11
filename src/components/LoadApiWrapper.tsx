"use client"

import { APIProvider, useApiIsLoaded } from "@vis.gl/react-google-maps"

export default function LoadApiWrapper({ children }: any) {
  return (
    <APIProvider libraries={['places']} apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}>
      {children}
    </APIProvider>
  )
}

export function ApiLoadedWrapper({children}:any) {
  const apiLoaded = useApiIsLoaded()
  return apiLoaded ? children : null
}