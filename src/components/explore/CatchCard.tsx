import * as React from "react"

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { CalendarDays } from "lucide-react"
import { TbRoute, TbWeight, TbMapPin2 } from "react-icons/tb"
import { GiFishingLure } from "react-icons/gi"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Image from "next/image"
import { Button } from "../ui/button"
import { useMapContext } from "../context/MapContext"
import { CatchData } from "./mapSlice"

interface CatchCardProps {
  data: CatchData
}

export default function CatchCard({ data }: CatchCardProps) {
  const { mapRef } = useMapContext()

  const gotoMarkerLocation = () => {
    mapRef?.current?.flyTo({ center: [data.coordinates.lng, data.coordinates.lat], zoom: 18 })
  }

  return (
    <Card className="w-full mb-3">
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <div className="flex justify-between space-x-4 h-9">
            <Avatar className="w-9 h-9">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h4 className="text-sm font-semibold">{data.username}</h4>
              <h2 className="text-xs">{data.location}</h2>
            </div>
          </div>
          <div>
            <Button variant="ghost_secondary" size="icon" onClick={gotoMarkerLocation}>
              <TbMapPin2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="w-full">
        <div className="space-y-3 w-full">
          <span className="flex flex-col items-center relative w-full h-64 2xl:h-96">
            <Image src={data.image} alt='fish' className="w-full h-full absolute rounded-md" priority={true} />
            <div className="backdrop-blur bg-black/10 w-full h-full absolute rounded-md" />
            <Image src={data.image} alt='fish' className="w-auto h-full z-10" priority={true} />
          </span>
          <span className="flex flex-row justify-between items-center">
            <h1 className="text-lg font-semibold">{data.species}</h1>
            <Image src={data.icon} alt='fish' className="h-auto w-[50px]" priority={false} />
          </span>
          <div className="flex flex-row justify-between w-full">
            <div className="flex items-center">
              <GiFishingLure className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">
                {data.lure}
              </span>
            </div>
            <div className="flex items-center">
              <TbWeight className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">
                {data.weight}
              </span>
            </div>
            <div className="flex items-center">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">
                {data.date}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card >
  )
}
