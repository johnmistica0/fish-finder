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
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger>
          <DropdownMenu onOpenChange={handleDropdownClick}>
            <DropdownMenuTrigger asChild>
              <Avatar>
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
  );
}