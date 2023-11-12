import 'mapbox-gl/dist/mapbox-gl.css';
import { Marker } from 'react-map-gl';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";

export default function LocationMarker({location}: any) {

  return (
    <Marker longitude={location.lng} latitude={location.lat} anchor="bottom">
      <TooltipProvider delayDuration={150}>
        <Tooltip>
          <TooltipTrigger className="cursor-default">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
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