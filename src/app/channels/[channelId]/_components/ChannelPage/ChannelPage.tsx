'use client';


import { ChatBubbleBottomCnterTextIcon } from "@/components/ui/icons/ChatBubbleBottomCnterTextIcon";
import { Lobby } from "@/app/channels/[channelId]/_components/Lobby";
import { Channel } from "../Channel";
import { useState } from "react";
import { Channel as ChannelT } from "@/types/Channel";
import { RememberAuthorDialog } from "../RememberAuthorDialog";

interface ChannelPageProps {
  channel: ChannelT
  author: string | null
}

export const ChannelPage = ({ channel, author: currentAuthor }: ChannelPageProps) => {
  const [author, setAuthor] = useState<string | null>(currentAuthor);
  const [isRememberAuthorDialogOpen, setIsRememberAuthorDialogOpen] = useState(false);

  const isInLobby = author === null || author === "";

  const handleChannelJoin = (author: string) => {
    setAuthor(author);
    setIsRememberAuthorDialogOpen(true);
  }

  const closeRememberAuthorDialog = () => setIsRememberAuthorDialogOpen(false)

  const { name, max_users } = channel;
  const tag = channel.tag.name;

  return (
    <div className="p-8">
      <div className="flex items-center gap-2 mb-4 justify-between">
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
        <Lobby onJoinChannel={handleChannelJoin} />
      ) : (
        <Channel author={author} channelId={String(channel.id)} />
      )}

      <RememberAuthorDialog 
        author={author}
        open={isRememberAuthorDialogOpen}
        onClose={closeRememberAuthorDialog}
      />
    </div>
  );
}
