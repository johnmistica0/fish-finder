import { Button, buttonVariants } from "@/components/ui/button";
import 'mapbox-gl/dist/mapbox-gl.css';
import { ScrollArea } from "../ui/scroll-area";
import CatchCard from "./CatchCard";
import { FaFilter } from "react-icons/fa";
import { ImShrink2 } from "react-icons/im";
import { FaCirclePlus } from "react-icons/fa6";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";
import { useMapContext } from "../context/MapContext";
import { Menu, X } from "lucide-react";
import { CatchData, selectMarkerData } from "./mapSlice";
import { useAppSelector } from "@/app/hooks";

export default function CatchFeed({ open, setOpen }: any) {
  const { mapRef } = useMapContext()
  const markerData = useAppSelector(selectMarkerData)

  const handleMinimize = () => {
    setOpen((prev: any) => !prev)
    mapRef.current?.resize()
  }

  return (
    <div className="flex flex-col p-5 h-full items-center bg-slate-100 dark:bg-slate-900">
      {open ? <><div className={cn(`${open ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`, "flex flex-row justify-between items-center w-full")}>
        <p className="text-lg font-semibold">Catches Near You</p>
        <span className="flex flex-row items-center h-full space-x-1">
          <Button variant="ghost" size="icon">
            <ImShrink2 />
          </Button>
          <Button variant="ghost" size="icon">
            <FaFilter />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleMinimize}>
            <X />
          </Button>
        </span>
      </div>
        <span className="flex flex-grow h-96 mt-3 w-full">
          <ScrollArea className="rounded-md h-full w-full">
            {markerData.map((data: CatchData) => {
              return <CatchCard key={data.id} data={data} />
            })}
          </ScrollArea>
        </span>
        <span className="mt-5">
          <Button variant="outline">
            Create New Catch
            <FaCirclePlus className="ml-2 w-4 h-4" />
          </Button>
        </span></> :
        <Button className={cn(`${open ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`)} variant="ghost" size="icon" onClick={handleMinimize}>
          <Menu />
        </Button>
      }
    </div>
  )
}
