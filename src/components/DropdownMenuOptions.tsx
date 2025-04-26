import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVerticalIcon } from "./ui/icons/EllipsisVerticalIcon";
import { Button } from "./ui/button";

interface DropdownMenuOptionsProps {
  options?: {label: string; action: () => void}[] | null;
}

export const DropdownMenuOptions = ({ options }: DropdownMenuOptionsProps) => {

  if (!options || options.length === 0) {
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
        {options.map(({ label, action }, index) => (
          <DropdownMenuItem key={index} onClick={action}>
            {label}
          </DropdownMenuItem>
        ))}
       </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
