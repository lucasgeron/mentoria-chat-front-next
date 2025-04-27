import { MessageInput } from "@/app/channels/[channelId]/_components/MessageInput/MessageInput";
import { Messages } from "@/app/channels/[channelId]/_components/Messages/Messages";
import { createConnection, subscribeToChannel } from "@/lib/cable";
import { Message } from "@/types/Message";
import { Consumer, Mixin, Subscription } from "@rails/actioncable";
import { useEffect, useState } from "react";
import { useChannelActions } from "./hooks";

interface ChannelProps {
  author: string
  channelId: string
}

export const Channel = ({ author, channelId }: ChannelProps) => { 
  const [messages, setMessages] = useState<Message[]>([]);
  const { actions } = useChannelActions({author});
  
  useEffect(() => {
    let subscription: Subscription<Consumer> & Mixin & { connected(): void; disconnected(): void; received(data: Message): void; }

    const handleMessageReceived = (message: Message) => {
      setMessages(prev => [...prev, message]);
    }

    if (author) {
      createConnection(author);
      subscription = subscribeToChannel(channelId, handleMessageReceived);
    } else {
    // TODO: make server notify that the user changed the name
    // when the user changes their name, the server only notifies that the new name joined the room, this is incorrect.
    // we expect that the server notifies that the user changed their name
    }
    
    return () => {
      subscription?.unsubscribe();
    };
  }, [author, channelId]);

  return (
    <div className="flex flex-col gap-2">
      <Messages messages={messages} />
      <MessageInput author={author} channelId={channelId} actions={actions} />
    </div>
  )
}