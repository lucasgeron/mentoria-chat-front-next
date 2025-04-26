'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createConnection, subscribeToChannel } from "@/lib/cable";
import { Message } from "@/types/message";
import { MessageInput } from "@/components/MessageInput";
import { Subscription, Consumer, Mixin } from "@rails/actioncable";
import { Button } from "@/components/ui/button";
import { Messages } from "@/components/Messages";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ChatBubbleBottomCnterTextIcon } from "@/components/ui/icons/ChatBubbleBottomCnterTextIcon";
import { ArrowRightEndOnRectangleIcon } from "@/components/ui/icons/ArrowRightEndOnRectangleIcon";

export default function RoomPage() {
  const router = useRouter();
  const { channelId } = useParams() as { channelId: string };
  const [messages, setMessages] = useState<Message[]>([]);
  const [author, setAuthor] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const handleMessageReceived = (message: Message) => {
    setMessages(prev => [...prev, message]);
  }

  const handleSubmit = () => { 
    setAuthor(inputValue);
    toast.success(`You have joined as: ${inputValue}!`);
   }

  useEffect(() => {
    let subscription: Subscription<Consumer> & Mixin & { connected(): void; disconnected(): void; received(data: Message): void; }
  
    if(author) {
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


  const handleDropdownMenuItem = (item: string) => {
    switch (item) {
      case 'CHANGE_NAME':
        setAuthor(null);
        setInputValue("");
        break;
      case 'LEAVE_ROOM':
        router.push("/rooms");
      default:
        break;
    }
  }

  const options: { label: string; action: () => void }[] = [
    // {
    //   label: 'Change Name',
    //   action: () => handleDropdownMenuItem('CHANGE_NAME')
    // }
    {
      label: 'Sair',
      action: () => handleDropdownMenuItem('LEAVE_ROOM')
    }
  ]


  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2 "><ChatBubbleBottomCnterTextIcon /> Chat Room {channelId}</h1>

      {author ? (
        <div className="flex flex-col gap-2 mb-4">
          <Messages messages={messages} />
          <MessageInput author={author} channelId={channelId} options={options} />
        </div>
      ) : (
        <div className="flex gap-2 ">
          <input
            type="text"
            autoFocus
            placeholder="What would you like to be called?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            className="bg-gray-800 text-white py-2 px-4 w-full rounded-lg text-sm ring-0 outline-none focus:ring-0"
          />

          <Button disabled={!inputValue} onClick={handleSubmit}><ArrowRightEndOnRectangleIcon /></Button>
        </div>
      )}
    </div>
  );
}
