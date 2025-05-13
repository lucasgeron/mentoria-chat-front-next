import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRightEndOnRectangleIcon } from "@/components/ui/icons/ArrowRightEndOnRectangleIcon";
import { toast } from "sonner";
import { RoomActions } from "@/app/rooms/[roomId]/_components/RoomActions";
import { useRoomActions } from "../Room/hooks";

interface LobbyProps {
  onJoinRoom: (author: string) => void;
  hideActions?: boolean
}

export const Lobby = ({ onJoinRoom, hideActions }: LobbyProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const { actions } = useRoomActions();
  
  const joinRoom = () => {
    if(inputValue.trim() !== "") {
      onJoinRoom(inputValue);
      toast.success(`You have joined as ${inputValue}!`);
    } else {
      toast.error("Please enter a name to join the room.");
    }
  }

  return (
    <div className="flex gap-2 ">
      <input
        type="text"
        autoFocus
        placeholder="What would you like to be called?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && joinRoom()}
        className="bg-gray-800 text-white py-2 px-4 w-full rounded-lg text-sm ring-0 outline-none focus:ring-0"
      />

      {!hideActions && <RoomActions context={["lobby"]} actions={actions} />}

      <Button disabled={!inputValue} onClick={joinRoom} size={"icon"}>
        <ArrowRightEndOnRectangleIcon />
      </Button>
    </div>
  );
};