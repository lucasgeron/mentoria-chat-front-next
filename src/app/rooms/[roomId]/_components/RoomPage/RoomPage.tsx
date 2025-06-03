'use client';

import { ChatBubbleBottomCnterTextIcon } from "@/components/ui/icons/ChatBubbleBottomCnterTextIcon";
import { Lobby } from "@/app/rooms/[roomId]/_components/Lobby";
import { Room } from "../Room";
import { useState } from "react";
import { Room as RoomT } from "@/types/Room"
import { RememberAuthorDialog } from "../RememberAuthorDialog";

interface RoomPageProps {
  room: RoomT
  author: string | null
}

export const RoomPage = ({ room, author: currentAuthor }: RoomPageProps) => {
  const [author, setAuthor] = useState<string | null>(currentAuthor);
  const [isRememberAuthorDialogOpen, setIsRememberAuthorDialogOpen] = useState(false);
  const [totalOnline, setTotalOnline] = useState<number>(0); // TODO: Read the data from the Application Channel when its implemented

  const isInLobby = author === null || author === "";

  const handleRoomJoin = (author: string) => {
    setAuthor(author);
    setIsRememberAuthorDialogOpen(true);
  }

  const closeRememberAuthorDialog = () => setIsRememberAuthorDialogOpen(false)

  const { name, max_users } = room;
  const tag = room.tag.name;

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
            Max Users: <span className="font-bold">{totalOnline} / {max_users}</span>
          </p>
        </div>
      </div>

      {isInLobby ? (
        <Lobby onJoinRoom={handleRoomJoin} />
      ) : (
        <Room author={author} roomId={String(room.id)} onTotalOnlineChange={setTotalOnline} />
      )}

      <RememberAuthorDialog 
        author={author}
        open={isRememberAuthorDialogOpen}
        onClose={closeRememberAuthorDialog}
      />
    </div>
  );
}
