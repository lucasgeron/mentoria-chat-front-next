'use client';

import { ChatBubbleBottomCnterTextIcon } from "@/components/ui/icons/ChatBubbleBottomCnterTextIcon";
import { Channel as ChannelT } from "@/types/Channel";
import { Channel } from "../Channel";
import { Filters } from "../Filters";
import { useState } from "react";
import { useFilteredChannels } from "./hooks/useFilteredChannels";

interface ChannelListProps {
  channels: ChannelT[]
}

export const ChannelList = ({ channels }: ChannelListProps) => { 

  const {filteredChannels, filteredTags, handleFilterChange } = useFilteredChannels(channels);

  return (
    <div className="p-8 ">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2 ">
        <ChatBubbleBottomCnterTextIcon /> Channels List
      </h1>

      <Filters onFilterChange={handleFilterChange} tags={filteredTags} />
    
      {filteredChannels && filteredChannels.length > 0 ? (
        <div className="mx-auto grid grid-cols-1 gap-2">
          {filteredChannels.map((channel: ChannelT) => <Channel key={channel.id} channel={channel} />)}
        </div>
      ) : (
        <div className="bg-gray-800 p-4 rounded-lg flex flex-col gap-2">
          <p className="text-lg font-semibold">
            No channels found
          </p>
        </div>
      )}
    </div>
  );
}