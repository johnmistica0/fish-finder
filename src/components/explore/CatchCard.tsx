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
import { CatchData } from "../context/MapContext.types"
import { useMapContext } from "../context/MapContext"

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
            <Avatar className="w-auto h-full">
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
      <CardContent>
        <div className="space-y-3">
          <Image src={data.image} alt='fish' className="rounded-md" priority={true} />
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
