import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import ProfileMenu from "./ProfileMenu";
import { useState } from "react";

export default function ProfileButton() {
  const [tooltipVisible, setTooltipVisible] = useState(true);

  const handleDropdownClick = () => {
    setTooltipVisible((prev) => !prev);
  };

  return (
    <span className="h-10 px-4 py-2 inline-flex items-center justify-center">
      <TooltipProvider delayDuration={150}>
        <Tooltip>
          <TooltipTrigger>
            <DropdownMenu onOpenChange={handleDropdownClick}>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <ProfileMenu />
            </DropdownMenu>
          </TooltipTrigger>
          {tooltipVisible &&
            <TooltipContent>
              <p>Account</p>
            </TooltipContent>}
        </Tooltip>
      </TooltipProvider>
    </span>
  );
}