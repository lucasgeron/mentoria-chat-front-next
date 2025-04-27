import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRightEndOnRectangleIcon } from "@/components/ui/icons/ArrowRightEndOnRectangleIcon";
import { toast } from "sonner";
import { ChannelActions } from "@/app/channels/[channelId]/_components/ChannelActions";
import { useChannelActions } from "../Channel/hooks";

interface LobbyProps {
  onJoinChannel: (author: string) => void;
  hideActions?: boolean
}

export const Lobby = ({ onJoinChannel, hideActions }: LobbyProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const { actions } = useChannelActions();
  
  const joinRoom = () => {
    if(inputValue.trim() !== "") {
      onJoinChannel(inputValue);
      toast.success(`You have joined as ${inputValue}!`);
    } else {
      toast.error("Please enter a name to join the channel.");
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

      {!hideActions && <ChannelActions context={["lobby"]} actions={actions} />}

      <Button disabled={!inputValue} onClick={joinRoom} size={"icon"}>
        <ArrowRightEndOnRectangleIcon />
      </Button>
    </div>
  );
};