'use client'

import { RoomDetails } from "@/types/RoomDetails";
import { SidebarMetric } from "../SidebarMetric";
import { SidebarAuthors } from "../SidebarAuthors/SidebarAuthors";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronRightIcon } from "@/components/ui/icons/ChevronRightIcon";
import { ChevronLeftIcon } from "@/components/ui/icons/ChevronLeftIcon";

export interface SidebarProps {
  totalMessages: RoomDetails["totalMessages"];
  authors: RoomDetails['authors'];
}

interface ToggleSidebarButtonProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar = ({ totalMessages, authors }: SidebarProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <div 
      className={cn(
        'transition-all duration-300 flex flex-col gap-2 bg-gray-800 rounded-lg p-4',
        sidebarOpen ? 'w-64' : 'w-16',
      )}>
        {sidebarOpen ? (
          <>
           <div className="flex justify-between items-center ">
              <h2 className="font-semibold text-white flex-grow w-full">Room Details</h2>
              <ToggleSidebarButton sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            </div>
            <SidebarMetric label="Total Messages" value={totalMessages} />
            <SidebarSeparator />
            <SidebarAuthors authors={authors} />
          </>
        ) : (
          <ToggleSidebarButton sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        )}
    </div>
  )
}

const ToggleSidebarButton = ({ sidebarOpen, toggleSidebar }: ToggleSidebarButtonProps) => (
  <button
    onClick={toggleSidebar}
    className="self-end text-white bg-gray-900 hover:bg-gray-700 p-2 rounded-lg focus:outline-none focus:ring-0 cursor-pointer"
    aria-label={sidebarOpen ? 'close sidebar' : 'open sidebar'}
  >
    {sidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
  </button>
)

export const SidebarSeparator = () => (
  <div className="border-b border-gray-700" />
)

