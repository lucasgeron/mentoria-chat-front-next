import { MessageProvider } from "./providers/MessageProvider";
import { Message as MessageT } from "@/types/Message";
import { MessageComponent } from "./MessageComponent";


export interface MessageProps {
 message: MessageT
}

export const Message = ({ message }: MessageProps) => {
  return (
    <MessageProvider source={message.source}>
      <MessageComponent>
        <div className="flex justify-between">
          <div className="flex gap-2 divide-x-2 divide-gray-700">
            <MessageComponent.Author>{message.author}</MessageComponent.Author>
            <MessageComponent.Content>{message.content}</MessageComponent.Content>
          </div>
          <MessageComponent.Timestamp>{message.sent_at}</MessageComponent.Timestamp>
        </div>
      </MessageComponent>
    </MessageProvider>
  );
};




