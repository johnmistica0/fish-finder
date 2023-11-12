import * as React from "react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { CalendarDays, MapPin, UserCircle, X } from "lucide-react"
import { HoverCard, HoverCardArrow, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"
import { GiFishingLure } from "react-icons/gi"
import { FaFish } from "react-icons/fa"
import useOnclickOutside from "react-cool-onclickoutside"
import { useState } from "react"

export default function CatcherMarkerCard({ children, closeClickHandler, open }: any) {
  const [showCard, setShowCard] = useState(true)
  const ref = useOnclickOutside(() => {
    setShowCard(false)
  });

  return (
    <HoverCard open={open}>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent side={"top"} className="cursor-default w-auto">
        <div className="flex flex-row justify-between">
          <div className="flex justify-between space-x-4">
            <FaFish className="w-10 h-10" />
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
          </div>
          <Button variant="ghost" size="x" onClick={closeClickHandler}>
            <X />
          </Button>
        </div>
        <HoverCardArrow className="fill-white dark:stroke-slate-800 dark:fill-slate-950" height={10} />
      </HoverCardContent>
    </HoverCard>
  )
}

export function HoverCardDemo({ children, open }: any) {
  return (
    <HoverCard open={open}>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent side={"top"} className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
        <HoverCardArrow className="fill-white dark:stroke-slate-800 dark:fill-slate-950" height={10} />
      </HoverCardContent>
    </HoverCard>
  )
}