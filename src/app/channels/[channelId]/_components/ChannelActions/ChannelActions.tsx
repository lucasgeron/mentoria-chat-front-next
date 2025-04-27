import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVerticalIcon } from "@/components/ui/icons/EllipsisVerticalIcon";
import { Button } from "@/components/ui/button";
import { ChannelAction } from "@/app/channels/[channelId]/_components/Room/types";

interface ChannelActions {
  actions?: ChannelAction[] | null;
}

export const ChannelActions = ({ actions }: ChannelActions) => {

  if (!actions || actions.length === 0) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <EllipsisVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="top">
       <DropdownMenuGroup>
        {actions.map(({ label, action }, index) => (
          <DropdownMenuItem key={index} onClick={action}>
            {label}
          </DropdownMenuItem>
        ))}
       </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
