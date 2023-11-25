import * as React from "react"

import { CalendarDays, MapPin, UserCircle } from "lucide-react"
import { HoverCard, HoverCardArrow, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"
import { GiFishingLure } from "react-icons/gi"
import Image from "next/image"
import fishIcon from '@/assets/fish-icon.png'
import { Button } from "../ui/button"
import { BiSolidDirectionRight } from "react-icons/bi";
import getDirections from "../api/geojson-directions"
import { useMapContext } from "../context/MapContext"
import { useState } from "react"
import { LineString, Position }  from 'geojson';
import { LngLatBoundsLike } from "mapbox-gl"
import { selectUserLocation, setDirectionsData } from "./mapSlice"
import { useAppDispatch, useAppSelector } from "@/app/hooks"

export default function CatcherMarkerCard({ children, setFocus, location }: any) {
  const { mapRef } = useMapContext()
  const userLocation = useAppSelector(selectUserLocation)
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(true)

  const setRoute = async () => {
    if (userLocation !== null) {
      try {
        const result = await getDirections(userLocation, location)
        if (result.code === "Ok") {
          dispatch(setDirectionsData(result))
          const coordinates = (result.routes[0].geometry as LineString).coordinates
          mapRef.current?.fitBounds([getSWCoordinates(coordinates), getNECoordinates(coordinates)] as LngLatBoundsLike, { padding: 100 })
        }
      } catch (e) {
        console.log(e)
      }
    }
    setOpen(false)
  }

  return (
    <HoverCard onOpenChange={setFocus}>
      <HoverCardTrigger asChild onMouseEnter={() => setOpen(true)}>
        {children}
      </HoverCardTrigger>
      {open && <HoverCardContent side="top" className="cursor-default w-auto">
        <div className="flex flex-row justify-between">
          <div className="flex justify-between items-center">
            <Image src={fishIcon} alt='fish' className="w-20 h-auto mr-3" priority={false} />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">Largemouth Bass</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <UserCircle className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-xs text-muted-foreground">
                    @john_mistica
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-xs text-muted-foreground">
                    Lake Travis
                  </span>
                </div>
                <div className="flex items-center">
                  <GiFishingLure className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-xs text-muted-foreground">
                    Crankbait
                  </span>
                </div>
                <div className="flex items-center">
                  <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-xs text-muted-foreground">
                    Dec 2, 2021
                  </span>
                </div>
              </div>
            </div>
            <Button variant="outline" size="icon" onClick={setRoute}>
              <BiSolidDirectionRight className="w-7 h-7" />
            </Button>
          </div>
        </div>
        <HoverCardArrow className="fill-white dark:stroke-slate-800 dark:fill-slate-950" height={10} />
      </HoverCardContent>}
    </HoverCard>
  )
}

function getSWCoordinates(coordinatesCollection: Position[]) {
  const lowestLng = Math.min(
    ...coordinatesCollection.map((coordinates) => coordinates[0])
  );
  const lowestLat = Math.min(
    ...coordinatesCollection.map((coordinates) => coordinates[1])
  );

  return [lowestLng, lowestLat];
}

function getNECoordinates(coordinatesCollection: Position[]) {
  const highestLng = Math.max(
    ...coordinatesCollection.map((coordinates) => coordinates[0])
  );
  const highestLat = Math.max(
    ...coordinatesCollection.map((coordinates) => coordinates[1])
  );

  return [highestLng, highestLat];
}