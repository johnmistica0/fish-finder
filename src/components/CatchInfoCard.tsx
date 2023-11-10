import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { CalendarDays, X } from "lucide-react"

export default function CatchInfoCard({ closeClickHandler }: { closeClickHandler: () => void }) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
        <CardTitle>Catch Info</CardTitle>
          <Button variant="ghost" size="icon" onClick={closeClickHandler}>
            <X />
          </Button>
        </div>
        <CardDescription>Largemouth caught at lake beegus</CardDescription>
      </CardHeader>
      <CardContent>
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
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center pt-2">
        <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
        <span className="text-xs text-muted-foreground">
          Caught December 2 2021
        </span>
      </CardFooter>
    </Card>
  )
}
