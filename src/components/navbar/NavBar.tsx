"use client"

import * as React from "react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Profile from "./Profile"
import { Button } from "../ui/button"
import { Fish, SearchIcon } from "lucide-react"
import Notifications from "./Notifications"
import { Input } from "../ui/input"
import Messages from "./Messages"
import { useRouter } from 'next/navigation'
import { APIProvider } from "@vis.gl/react-google-maps"
import AutoComplete from "../AutoComplete"
import { ApiLoadedWrapper } from "../LoadApiWrapper"

export function NavBar() {
  const router = useRouter()

  return (
    <NavigationMenu className="grid lg:grid-flow-col xl:grid-cols-3 justify-stretch max-w-full px-8 h-16">
      <div className="justify-self-start">
        <NavigationMenuList className="space-x-3">
          <NavigationMenuItem>
            <Button variant="outline" className="space-x-2 text-lg font-bold" onClick={() => router.push('/')}>
              <Fish />
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
      </div>
      <div className="justify-self-center">
        <NavigationMenuList className="space-x-5">
          <NavigationMenuItem>
            <ApiLoadedWrapper>
              <AutoComplete />
            </ApiLoadedWrapper>
            {/* <Input className="md:w-64 xl:w-80" type="email" placeholder="Search for fishing location..." icon={<SearchIcon className="dark:stroke-slate-300 h-5 w-5" />} /> */}
          </NavigationMenuItem>
        </NavigationMenuList>
      </div>
      <div className="justify-self-end">
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
      </div>
    </NavigationMenu>

  )
}
