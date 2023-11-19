import { useMapContext } from "@/components/context/MapContext";
import 'mapbox-gl/dist/mapbox-gl.css';
import { FaCar } from "react-icons/fa";
import { Button } from "../ui/button";
import { X, ChevronDown } from "lucide-react";
import { Separator } from "@/components/ui/separator"
import { FaRoute } from "react-icons/fa";

export default function DirectionsCard() {
  const { directionsData, setDirectionsData, mapRef } = useMapContext()
  return (
    <>
      {directionsData && <div className="absolute top-0 right-0 p-5 z-10">
        <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded-md">
          <div className="flex flex-row space-x-2 justify-between items-center">
            <h2 className="font-semibold">Directions</h2>
            <Button variant="ghost" size="x" onClick={() => setDirectionsData(null)}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          <Separator className="my-2" />
          <span className="flex flex-row items-center justify-between space-x-5">
            <div className="flex flex-row space-x-1 items-center">
              <FaCar className="w-5 h-5 mr-1" />
              {directionsData.routes[0].duration > 3600 &&
                <>
                  <p className="text-sm">{secondsToHrMin(directionsData.routes[0].duration).hours}</p>
                  <p className="text-sm">hrs</p>
                </>}
              <p className="text-sm">{secondsToHrMin(directionsData.routes[0].duration).minutes}</p>
              <p className="text-sm">min</p>
            </div>
            <div className="flex flex-row space-x-1 items-center">
              <FaRoute className="w-4 h-4 mr-1"/>
              <p className="text-sm">{metersToMiles(directionsData.routes[0].distance)}</p>
              <p className="text-sm">mi</p>
            </div>
            <Button variant="outline" size="sm">
              Details
              <ChevronDown className="ml-2 w-5 h-5" />
            </Button>
          </span>
        </div>
      </div>}
    </>
  )
}

function secondsToHrMin(seconds: number): { hours: number, minutes: number } {
  const hours = Math.floor(seconds / 3600);
  const remainingSeconds = seconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  return { hours, minutes };
}

function metersToMiles(meters: number): number {
  const miles = meters * 0.000621371;
  const roundedMiles = Math.round(miles * 10) / 10;
  return roundedMiles;
}