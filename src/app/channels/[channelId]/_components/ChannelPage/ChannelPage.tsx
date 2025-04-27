'use client';


import { ChatBubbleBottomCnterTextIcon } from "@/components/ui/icons/ChatBubbleBottomCnterTextIcon";
import { Lobby } from "@/app/channels/[channelId]/_components/Lobby";
import { Room } from "../Room";
import { useState } from "react";
import { Channel } from "@/types/Channel";

interface ChannelPageProps {
  channel: Channel
}

export const ChannelPage = ({ channel }: ChannelPageProps) => {
  const [author, setAuthor] = useState<string | null>(null);

  const isInLobby = author === null;

  const handleRoomJoin = (author: string) => {
    setAuthor(author);
  }

  const { name, max_users } = channel;
  const tag = channel.tag.name;


  return (
    <div className="p-8">
      <div className="flex items-center gap-2 mb-4 ">
        <h1 className="text-2xl font-bold flex items-center gap-2 ">
          <ChatBubbleBottomCnterTextIcon /> {name}
        </h1>

        <div className="flex gap-2 items-center">
          <p className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
            {tag}
          </p>

          <p className="text-xs bg-gray-700 text-white px-2 py-1 rounded-full flex gap-1">
            Max Users: <span className="font-bold">{max_users}</span>
          </p>
        </div>
      </div>

      {isInLobby ? (
        <Lobby onJoinRoom={handleRoomJoin} />
      ) : (
        <Room author={author} channelId={String(channel.id)} />
      )}
    </div>
  );
}
