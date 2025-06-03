'use client'

import { Button } from "@/components/ui/button";
import { ArrowRightEndOnRectangleIcon } from "@/components/ui/icons/ArrowRightEndOnRectangleIcon";
import { Room as RoomT } from "@/types/Room";
import { useRouter } from "next/navigation";
import TimeAgo from 'react-timeago';

export interface RoomProps {
  room: RoomT;
  details?: import("../RoomList/hooks/useRoomDetails").RoomDetail | null;
}

export const Room = ({ room, details }: RoomProps) => { 
  const router = useRouter();
  const { name, max_users } = room;
  const tagName = room.tag.name;

  // Formatação da data
  const onlineCount = details?.online ?? 0;
  const messagesCount = details?.messages_count ?? 0;

  return (
    <div key={room.id} className="bg-gray-800 p-4 rounded-lg flex flex-col gap-2">
      <div className="flex gap-2 items-center justify-between w-full">
        <div className="flex gap-2 items-baseline">
          <p className="text-lg font-semibold mb-0">
            {name}
          </p>
          <div className="flex gap-2 items-center">
            <p className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
              {tagName}
            </p>
            <p className="text-xs bg-gray-700 text-white px-2 py-1 rounded-full flex gap-1">
              Messages: <span className="font-bold">{messagesCount}</span>
            </p>
            <p className="text-xs bg-gray-700 text-white px-2 py-1 rounded-full flex gap-1">
              Last Message: 
              <span className="font-bold">
                {details?.last_message_at 
                  ?<TimeAgo date={details?.last_message_at} />
                  : "☹️ no messages yet."
                }
              </span>
            </p>
            <p className="text-xs bg-gray-700 text-white px-2 py-1 rounded-full flex gap-1">
              Online: <span className="font-bold">{onlineCount} of {max_users}</span>
            </p>
          </div>
        </div>
        <Button variant={"outline"} onClick={() => router.push(`/rooms/${room.id}`)} >
          <span>Join</span>
          <ArrowRightEndOnRectangleIcon />
        </Button>
      </div>
    </div>
  );
}