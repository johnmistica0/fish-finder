import { buttonVariants } from "@/components/ui/button";
import 'mapbox-gl/dist/mapbox-gl.css';
import { ScrollArea } from "../ui/scroll-area";
import CatchCard from "./CatchCard";
import { FaFilter } from "react-icons/fa";
import { ImShrink2 } from "react-icons/im";
import { BiArrowToLeft } from "react-icons/bi";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";
import { useMapContext } from "../context/MapContext";
import { CatchData } from "../context/MapContext.types";

export default function CatchFeed() {
  const { markerData } = useMapContext()

  return (
    <div className="flex flex-col p-5 space-y-3 h-full items-center">
      <div className="flex flex-row justify-between items-center w-full">
        <p className="text-lg font-semibold">Catches Near You</p>
        <span className="flex flex-row items-center h-full space-x-1">
          <TooltipProvider delayDuration={150}>
            <Tooltip>
              <TooltipTrigger>
                <span className={cn("rounded-full", buttonVariants({ variant: "ghost", size: "icon" }))}>
                  <ImShrink2 />
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom" align="start" alignOffset={-25}>
                <p>Minimize</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={150}>
            <Tooltip>
              <TooltipTrigger>
                <span className={cn("rounded-full", buttonVariants({ variant: "ghost", size: "icon" }))}>
                  <FaFilter />
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom" align="start" alignOffset={-12}>
                <p>Filter</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={150}>
            <Tooltip>
              <TooltipTrigger>
                <span className={cn("rounded-full", buttonVariants({ variant: "ghost", size: "icon" }))}>
                  <BiArrowToLeft className="w-6 h-6" />
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom" align="start" alignOffset={-25}>
                <p>Collapse</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </span>
      </div>
      <span className="flex flex-grow h-96">
        <ScrollArea className="rounded-md h-full w-full">
          {markerData.map((data: CatchData) => {
            return <CatchCard key={data.id} data={data}/>
          })}
        </ScrollArea>
      </span>
    </div>
  )
}
