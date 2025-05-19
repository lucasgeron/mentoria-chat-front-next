import { MessageInput } from "@/app/rooms/[roomId]/_components/MessageInput/MessageInput";
import { Messages } from "@/app/rooms/[roomId]/_components/Messages/Messages";
import { createConnection, subscribeToRoom } from "@/lib/cable";
import { Message } from "@/types/Message";
import { Consumer, Mixin, Subscription } from "@rails/actioncable";
import { useEffect, useState } from "react";
import { useRoomActions } from "./hooks";
import { toast } from "sonner";
import { RoomDetails } from "@/types/RoomDetails";
import { Sidebar } from "./Sidebar";

interface RoomProps {
  author: string
  roomId: string
  onTotalOnlineChange?: (total: number) => void
}

export const Room = ({ author, roomId, onTotalOnlineChange = () => {} }: RoomProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [authors, setAuthors] = useState<string[]>([author]);
  const [totalMessages, setTotalMessages] = useState<number>(0); 
  const { actions } = useRoomActions();

  useEffect(() => {
    let subscription: Subscription<Consumer> & Mixin & { connected(): void; disconnected(): void; received(data: Message): void; }

    const handleReceivedMessage = (message: Message) => {
      setMessages(prev => [...prev, message]);
    }

    const handleInfoMessage = (roomDetails: RoomDetails) => { 
      console.log('roomDetails', roomDetails);
      if (roomDetails.totalOnline) onTotalOnlineChange(roomDetails.totalOnline);
      if (roomDetails.totalMessages) setTotalMessages(roomDetails.totalMessages);
      if (roomDetails.authors) setAuthors(roomDetails.authors);
    }

    const handleReceived = (data: Message | RoomDetails) => {
      if (data.type === 'Message') {
        handleReceivedMessage(data);
      } else if (data.type === 'RoomDetails') {
        handleInfoMessage(data);
      } else {
        console.warn('Received unknown data type', data); // fallback: unknown type, ignore
      }
    }

    const onSubscriptionRejected = (message?: Omit<Message, "id">) => {
      if (message && message.content) {
        toast.error(message.content);
      } else {
        toast.error("Subscription rejected.");
      }
    }

    if (author) {
      createConnection(author);
      subscription = subscribeToRoom({ roomId, onReceived: handleReceived, onRejected: onSubscriptionRejected });
      console.log('subscription', subscription);
    } else {
    // TODO: make server notify that the user changed the name
    // when the user changes their name, the server only notifies that the new name joined the room, this is incorrect.
    // we expect that the server notifies that the user changed their name
    }
    
    return () => {
      subscription?.unsubscribe();
    };
  }, [author, roomId, onTotalOnlineChange]);

  return (
    <div className="flex w-full gap-2">
      <div className="flex flex-grow flex-col gap-2">
        <Messages messages={messages} />
        <MessageInput author={author} roomId={roomId} actions={actions} />
      </div>
      <Sidebar totalMessages={totalMessages} authors={authors} />
    </div>
  )
}