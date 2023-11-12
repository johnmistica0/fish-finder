"use client"

import * as React from "react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Profile from "./Profile"
import { Button } from "../ui/button"
import { Fish } from "lucide-react"
import Notifications from "./Notifications"
import Messages from "./Messages"
import { useRouter } from 'next/navigation'
import GeocodeSearchBar from "./GeocodeSearchBar"
import { GiFishing, GiFishingHook } from "react-icons/gi"

export function NavBar() {
  const router = useRouter()

  return (
    <NavigationMenu className="justify-between max-w-full px-8 h-16 relative">
      <NavigationMenuList className="space-x-3">
        <NavigationMenuItem>
          <Button variant="outline" className="space-x-3 text-lg font-bold" onClick={() => router.push('/')}>
            <GiFishing className="w-8 h-8"/>
            <p>Fish Finder</p>
          </Button>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Button variant="outline" onClick={() => router.push('/explore')}>
            <p>Explore</p>
          </Button>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Button variant="outline" onClick={() => router.push('/social')}>
            <p>Social</p>
          </Button>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Button variant="outline" onClick={() => router.push('/about')}>
            <p>About</p>
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
      <div className="absolute top-3 md:left-1/2 lg:left-[40%]">
        <NavigationMenuList >
          <NavigationMenuItem>
              <GeocodeSearchBar className="md:w-64 xl:w-80 2xl:w-96" />
          </NavigationMenuItem>
        </NavigationMenuList>
      </div>
      <NavigationMenuList className="space-x-2">
        <NavigationMenuItem>
          <Messages />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Notifications />
        </NavigationMenuItem>
        <NavigationMenuItem className="flex justify-center">
          <Profile />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>

  )
}
