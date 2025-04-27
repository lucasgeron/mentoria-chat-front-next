'use client';

import { Button } from "@/components/ui/button";
import { ArrowRightEndOnRectangleIcon } from "@/components/ui/icons/ArrowRightEndOnRectangleIcon";
import { ChatBubbleBottomCnterTextIcon } from "@/components/ui/icons/ChatBubbleBottomCnterTextIcon";
import { Channel } from "@/types/Channel";
import { useRouter } from "next/navigation";

interface ChannelListProps {
  channels: Channel[]
}

export const ChannelList = ({ channels }: ChannelListProps) => { 
  const router = useRouter();
  
  return (
    <div className="p-8">
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2 ">
          <ChatBubbleBottomCnterTextIcon /> Channel List
        </h1>
      
      {channels && channels.length > 0 ? (
        <div className="mx-auto grid grid-cols-1 gap-2">
          {channels.map((channel) => {
            const { name, max_users } = channel;
            const tag = channel.tag.name;

            return (
              <div key={channel.id} className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col gap-2">
                <div className="flex gap-2 items-center justify-between w-full">
                  <div className="flex gap-2 items-baseline">
                    <p className="text-lg font-semibold mb-0">
                      {name}
                    </p>

                    <div className="flex gap-2 items-center">
                      <p className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                        {tag}
                      </p>

                      <p className="text-xs bg-gray-700 text-white px-2 py-1 rounded-full flex gap-1">
                        Max Users: <span className="font-bold">{max_users}</span>
                      </p>
                    </div>
                  </div>

                  <Button className="" variant={"outline"} onClick={() => router.push(`/channels/${channel.id}`)} >
                    <span className="">Join Channel</span><ArrowRightEndOnRectangleIcon />
                  </Button>
                </div>
              </div>
           )})}
        </div>
      ) : (
        <div className="text-center text-gray-300">No channels found</div>
      )}
    </div>
  );
}