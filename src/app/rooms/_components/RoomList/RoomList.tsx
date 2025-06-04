'use client'

import { ChatBubbleBottomCnterTextIcon } from "@/components/ui/icons/ChatBubbleBottomCnterTextIcon";
import { Room as RoomT } from "@/types/Room"
import { Room } from "../Room";
import { Filters } from "../Filters";
import { useFilteredRooms } from "./hooks/useFilteredRooms";
import { createConnection, subscribeToRooms } from "@/lib/cable";
import { Message } from "@/types/Message";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface RoomListProps {
  rooms: RoomT[]
}

export const RoomList = ({ rooms }: RoomListProps) => { 
  const [roomDetails, setRoomDetails] = useState<{ online: number, messages_count: number, last_message_at: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const handleOnConnected = () => {
    toast.success(`Connected to rooms channel!`);
    console.log('Connected to rooms channel');
    // if we set the setLoading to false here, it will be set to false immediately after connection, but
    // the data might not be ready yet, so we will see the empty state for a moment, and then the data will appear
    // causing a flicker effect (layout shift).
  }
  const handleOnDisconnected = () => {
    console.log('Disconnected from rooms channel');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleReceived = (data: any) => {
    if (data && data.rooms) {
      setRoomDetails(data.rooms);
    }
    setLoading(false); // we set loading false after receiving and setting the data
    console.log('Received data', data);
  }

  const onSubscriptionRejected = (message?: Omit<Message, "id">) => {
    console.log('Subscription rejected', message);
  }

  useEffect(() => {
    createConnection();
    const subscription = subscribeToRooms({
      onReceived: handleReceived,
      onConnected: handleOnConnected,
      onDisconnected: handleOnDisconnected,
      onRejected: onSubscriptionRejected,
    });

    return () => {
      subscription.unsubscribe(); 
    };
  }, []);
    
  const getRoomDetail = (roomId: number) => {
    return {
      online: roomDetails?.[roomId]?.online || 0,
      messages_count: roomDetails?.[roomId]?.messages_count || 0,
      last_message_at: roomDetails?.[roomId]?.last_message_at || "",
    }
  }

  const {filteredRooms, filteredTags, handleFilterChange } = useFilteredRooms(rooms);

  return (
    <div className="p-8 ">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2 ">
        <ChatBubbleBottomCnterTextIcon /> Rooms List
        {loading && (
          <div className="bg-gray-800 px-2 rounded-lg inline-flex py-1 items-center text-sm  gap-2 ">
            <span className="w-4 h-4 rounded-full border-2 border-t-2 border-gray-400 border-t-blue-500 animate-spin"></span>
            <p className="font-semibold">Connecting...</p>
          </div>
        )}
      </h1>


      <Filters onFilterChange={handleFilterChange} tags={filteredTags} />
    
      {filteredRooms && filteredRooms.length > 0 ? (
        <div className="mx-auto grid grid-cols-1 gap-2">
          {filteredRooms.map((room: RoomT) => {
            const details = getRoomDetail(room.id);
            return (
              <Room key={room.id} room={room} details={details} loading={loading}/>
            );
          })}
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