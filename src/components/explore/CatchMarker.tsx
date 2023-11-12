import { useState } from "react";
import CatchMarkerCard from "@/components/explore/CatchMarkerCard";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Marker } from 'react-map-gl';
import { GiFishingHook } from "react-icons/gi";

export default function CatchMarker({location}: any) {
  const [open, setOpen] = useState(false)
  const [disableMarker, setDisableMarker] = useState(false)

  const handleMarkerClick = () => {
    if (!disableMarker) {
      setOpen(true)
    }
  }

  const handleCloseInfoCard = () => {
    setDisableMarker(true)
    setOpen(false)
    setDisableMarker(false)
  }

  return (
    <Marker longitude={location.lng} latitude={location.lat} anchor="center" onClick={handleMarkerClick} style={{ cursor: 'pointer' }}>
      <CatchMarkerCard open={open} closeClickHandler={handleCloseInfoCard}>
        <span className="relative flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full h-5 w-5 bg-red-500"></span>
          <GiFishingHook className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[13px] w-[13px]" />
        </span>
      </CatchMarkerCard>
    </Marker>
  )
}