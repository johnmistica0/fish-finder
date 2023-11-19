import 'mapbox-gl/dist/mapbox-gl.css';
import { Marker } from 'react-map-gl';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { useState } from 'react';

export default function LocationMarker({ location }: any) {
  const [focus, setFocus] = useState(false)
  return (
    <Marker longitude={location.lng} latitude={location.lat} anchor="center" style={{ cursor: 'default', zIndex: `${focus ? '1' : '0'}`}}>
      <TooltipProvider delayDuration={150}>
        <Tooltip onOpenChange={setFocus}>
          <TooltipTrigger className="cursor-default">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-600"></span>
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Current Location</p>
            <TooltipArrow className="fill-white dark:fill-slate-950" />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Marker>
  )

}