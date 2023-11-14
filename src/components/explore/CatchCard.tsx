import * as React from "react"

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { CalendarDays } from "lucide-react"
import { TbWeight } from "react-icons/tb"
import { GiFishingLure } from "react-icons/gi"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import fishImage from '@/assets/fish.jpg'
import fishIcon from '@/assets/fish-icon.png'
import Image from "next/image"
import { Button } from "../ui/button"
import { FaSearchLocation } from "react-icons/fa"

export default function CatchCard() {
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
              <h4 className="text-sm font-semibold">john_mistica</h4>
              <h2 className="text-xs">Lake Travis, TX</h2>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <FaSearchLocation className="w-5 h-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Image src={fishImage} alt='fish' className="rounded-md" priority={true} />
          <span className="flex flex-row justify-between items-center">
            <h1 className="text-lg font-semibold">Largemouth Bass</h1>
            <Image src={fishIcon} alt='fish' className="h-auto w-[50px]" priority={false}/>
          </span>
          <div className="flex flex-row justify-between w-full">
            <div className="flex items-center">
              <GiFishingLure className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">
                Crankbait
              </span>
            </div>
            <div className="flex items-center">
              <TbWeight className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">
                3 Ib 5 oz
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
      </CardContent>
    </Card >
  )
}
