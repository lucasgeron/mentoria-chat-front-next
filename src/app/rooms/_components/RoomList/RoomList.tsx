'use client';

import { ChatBubbleBottomCnterTextIcon } from "@/components/ui/icons/ChatBubbleBottomCnterTextIcon";
import { Room as RoomT } from "@/types/Room"
import { Room } from "../Room";
import { Filters } from "../Filters";
import { useFilteredRooms } from "./hooks/useFilteredRooms";

interface RoomListProps {
  rooms: RoomT[]
}

export const RoomList = ({ rooms }: RoomListProps) => { 

  const {filteredRooms, filteredTags, handleFilterChange } = useFilteredRooms(rooms);

  return (
    <div className="p-8 ">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2 ">
        <ChatBubbleBottomCnterTextIcon /> Rooms List
      </h1>

      <Filters onFilterChange={handleFilterChange} tags={filteredTags} />
    
      {filteredRooms && filteredRooms.length > 0 ? (
        <div className="mx-auto grid grid-cols-1 gap-2">
          {filteredRooms.map((room: RoomT) => <Room key={room.id} room={room} />)}
        </div>
      ) : (
        <div className="bg-gray-800 p-4 rounded-lg flex flex-col gap-2">
          <p className="text-lg font-semibold">
            No rooms found
          </p>
        </div>
      )}
    </div>
  );
}