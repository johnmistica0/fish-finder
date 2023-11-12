import { useState } from "react";
import CatchInfoCard from "@/components/CatchInfoCard";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Marker } from 'react-map-gl';

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
    <Marker longitude={location.lng} latitude={location.lat} anchor="bottom" onClick={handleMarkerClick} style={{ cursor: 'pointer' }}>
      <CatchInfoCard open={open} closeClickHandler={handleCloseInfoCard}>
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      </CatchInfoCard>
    </Marker>
  )
}