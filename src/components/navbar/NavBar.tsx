"use client"

import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Profile from "./Profile"
import { Button } from "../ui/button"
import { Fish, SearchIcon } from "lucide-react"
import Notifications from "./Notifications"
import { Input } from "../ui/input"
import Messages from "./Messages"

export function NavBar() {
  return (
    <NavigationMenu className="grid justify-items-stretch grid-cols-3 max-w-full px-8 h-16">
      <div className="justify-self-start">
        <NavigationMenuList className="space-x-3">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <Button variant="outline" className="space-x-2 text-lg font-bold">
                <Fish />
                <p>Fish Finder</p>
              </Button>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Explore
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Social
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                About
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </div>
      <div className="justify-self-center">
        <NavigationMenuList className="space-x-5">
          <NavigationMenuItem>
            <Input className="w-80" type="email" placeholder="Search for fishing location..." icon={<SearchIcon className="h-4 w-4"/>}/>
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
