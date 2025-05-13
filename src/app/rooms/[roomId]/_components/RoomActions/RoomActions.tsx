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
import { RoomAction } from "@/app/rooms/[roomId]/_components/Room/types";

interface RoomActions {
  actions?: RoomAction[] | null;
  context: string[];
}

export const RoomActions = ({ actions, context }: RoomActions) => {

  if (!actions || actions.length === 0 || actions.every(({ context: actionContext }) => actionContext?.every(ctx => !context.includes(ctx)))) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <EllipsisVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="top">
       <DropdownMenuGroup>
        {actions.map(({ label, action, context: actionContext }, index) => (
          actionContext?.some(ctx => context.includes(ctx)) && (
            <DropdownMenuItem key={index} onClick={action}>
              {label}
            </DropdownMenuItem>
          )
        ))}
       </DropdownMenuGroup>
       {}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
