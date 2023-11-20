import { useMapContext } from "@/components/context/MapContext";
import 'mapbox-gl/dist/mapbox-gl.css';
import { FaCar } from "react-icons/fa";
import { Button } from "../ui/button";
import { X, ChevronDown } from "lucide-react";
import { Separator } from "@/components/ui/separator"
import { FaRoute } from "react-icons/fa";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { v4 as uuidv4 } from 'uuid';
import { IconCornerUpLeft, IconCornerUpRight, IconMapPinCheck, IconArrowRampLeft, IconArrowRampRight, IconArrowBearLeft, IconArrowBearRight, IconNavigation, IconArrowBackUp, IconArrowBearRight2, IconArrowBearLeft2 } from '@tabler/icons-react';

export default function DirectionsCard() {
  const { directionsData, setDirectionsData } = useMapContext()
  const [openSteps, setOpenSteps] = useState<boolean>(false)

  const getModifierSymbol = (modifier: string, type: string) => {
    if (type === "arrive") {
      return <IconMapPinCheck className="w-5 h-5" />
    } else if (modifier === "left") {
      if (type === "turn") {
        return <IconCornerUpLeft />
      } else if (type === "off ramp") {
        return <IconArrowRampLeft />
      } else if (type === "fork") {
        return <IconArrowBearLeft2 />
      }
    } else if (modifier === "right") {
      if (type === "turn") {
        return <IconCornerUpRight />
      } else if (type === "off ramp") {
        return <IconArrowRampRight />
      } else if (type === "fork") {
        return <IconArrowBearRight2 />
      }
    } else if (modifier === "slight left") {
      if (type === "turn") {
        return <IconArrowBearLeft />
      }
    } else if (modifier === "slight right") {
      if (type === "turn") {
        return <IconArrowBearRight />
      }
    } else if (modifier === "uturn") {
      if (type === "turn") {
        return <IconArrowBackUp className="-rotate-90" />
      }
    }
    return <IconNavigation className="w-5 h-5" />
  }

  const getDirections = () =>
    directionsData?.routes[0].legs[0].steps.map((result, index, array) => {
      return (
        <div key={uuidv4()}>
          <div className="flex flex-row p-2 items-center justify-between">
            <span className="flex flex-row space-x-2">
              {getModifierSymbol(array[index - 1]?.bannerInstructions[0]?.primary.modifier, array[index - 1]?.bannerInstructions[0]?.primary.type)}
              <p className="text-sm">{result.maneuver.instruction}</p>
            </span>
            {array[index - 1] !== undefined &&
              <span>
                {metersToMiles(array[index - 1]?.distance) === 0 ?
                  <p className="text-sm ml-4">{metersToFeet(array[index - 1]?.distance) + " ft"}</p> :
                  <p className="text-sm ml-4">{metersToMiles(array[index - 1]?.distance) + " mi"}</p>}
              </span>}
          </div>
          <Separator />
        </div>
      )
    })


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
              <FaRoute className="w-4 h-4 mr-1" />
              <p className="text-sm">{metersToMiles(directionsData.routes[0].distance)}</p>
              <p className="text-sm">mi</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setOpenSteps(prev => !prev)}>
              Details
              <ChevronDown className={`${openSteps && 'rotate-180'} ml-2 w-5 h-5`} />
            </Button>
          </span>
          <ScrollArea className={`${openSteps ? 'h-32 w-full mt-2' : 'h-0 w-0'} transition-size duration-300 ease-in-out rounded-md dark:bg-slate-950`}>
            {getDirections()}
          </ScrollArea>
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

function metersToFeet(meters: number): number {
  const feetConversionFactor = 3.28084;
  const feetValue = meters * feetConversionFactor;
  const feetRounded = +feetValue.toFixed(1);
  return feetRounded;
}