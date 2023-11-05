import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { useState } from "react";
import { BellIcon, CalendarDays, Clock, MessageCircleIcon, MessageSquareDashedIcon, MessageSquareIcon, MessagesSquare, MessagesSquareIcon } from "lucide-react";
import { buttonVariants } from "../ui/button";

export default function Messages() {
  const [tooltipVisible, setTooltipVisible] = useState(true);

  const handleDropdownClick = () => {
    setTooltipVisible((prev) => !prev);
  };

  const Notification = (<DropdownMenuItem className="w-80">
    <div className="flex justify-between space-x-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png"  />
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h4 className="text-sm font-semibold">@john_mistica</h4>
        <p className="text-sm">
          Hey, how are you doing?
        </p>
        <div className="flex items-center pt-2">
          <Clock className="mr-2 h-4 w-4 opacity-70" />{" "}
          <span className="text-xs text-muted-foreground">
            Sun Nov 5 12:32 AM
          </span>
        </div>
      </div>
    </div>
  </DropdownMenuItem>)
  const numItems = 3

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger>
          <DropdownMenu onOpenChange={handleDropdownClick}>
            <DropdownMenuTrigger asChild>
              <span className={buttonVariants({ variant: "outline" })}>
                <MessageCircleIcon />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuGroup>
              <DropdownMenuContent align="center">
                {Array(numItems).fill(Notification).map((notification, index) => {
                  return (
                    <div key={index}>
                      {notification}
                      {index !== numItems-1 && <DropdownMenuSeparator />}
                    </div>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenuGroup>
          </DropdownMenu>
        </TooltipTrigger>
        {tooltipVisible &&
          <TooltipContent>
            <p>Messages</p>
          </TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
}