import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button"
import { RoomActions } from "@/app/rooms/[roomId]/_components/RoomActions/RoomActions";
import { toast } from "sonner"
import { PaperAirplaneIcon } from "@/components/ui/icons/PaperAirplaneIcon";
import { RoomAction as RoomActionT } from "@/app/rooms/[roomId]/_components/Room/types";

interface MessageInputProps {
  author: string;
  roomId: string;
  actions?: RoomActionT[];
}

export const MessageInput = ({ author, roomId, actions }: MessageInputProps) => {
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (content.trim() === "") {
      setErrors({ content: ["cannot be empty"] });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          author,
          room_id: roomId,
        }),
      });

      if (response.status !== 201) {
        const errorResponse = await response.json();
        setErrors(errorResponse.errors || {});
        return;
      }

      setErrors({});
    } catch (error) {
      setErrors({ general: [(error as Error).message] });
    }
    setContent("");
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([attribute, errorMessages]) => {
        errorMessages.forEach((error) => {
          toast.error(`${attribute === 'content' ? 'Message' : attribute} ${error}`);
        });
      });
    }
  }, [errors]);

  return (
    <div className="relative">
      <form
        onSubmit={sendMessage}
        className="flex gap-2"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            sendMessage(e as unknown as React.FormEvent<HTMLFormElement>);
          }
        }}
      >
        <input
          autoFocus={true}
          autoComplete="off"
          autoCorrect="off"
          type="text"
          placeholder="Type your message here..."
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="bg-gray-800 text-white py-2 px-4 w-full rounded-lg text-sm ring-0 outline-none focus:ring-0"
        />

        <RoomActions context={['room']} actions={actions} />

        {/* To test error toasts, remove the "disabled" prop from the button */}
        <Button disabled={!content} size={"icon"}><PaperAirplaneIcon /></Button> 
      </form>
    </div>
  );
};

