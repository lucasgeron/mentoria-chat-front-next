'use client'

import { ChatBubbleBottomCnterTextIcon } from "@/components/ui/icons/ChatBubbleBottomCnterTextIcon";
import { Room as RoomT } from "@/types/Room"
import { Room } from "../Room";
import { Filters } from "../Filters";
import { useFilteredRooms } from "./hooks/useFilteredRooms";
import { createConnection, subscribeToRooms } from "@/lib/cable";
import { Message } from "@/types/Message";

interface RoomListProps {
  rooms: RoomT[]
}

export const RoomList = ({ rooms }: RoomListProps) => { 

    const handleOnConnected = () => {
      console.log('Connected to rooms channel');
    }
    const handleOnDisconnected = () => {
      console.log('Disconnected from rooms channel');
    }

    const handleReceived = () => {
      console.log('Received data');
    }

    const onSubscriptionRejected = (message?: Omit<Message, "id">) => {
      console.log('Subscription rejected', message);
    }


   createConnection();
   const subscription = subscribeToRooms({
    onReceived: handleReceived,
    onConnected: handleOnConnected,
    onDisconnected: handleOnDisconnected,
    onRejected: onSubscriptionRejected,
  })

  console.log('subscription', subscription);

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