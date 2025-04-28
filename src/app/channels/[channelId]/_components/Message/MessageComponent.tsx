import { cn } from "@/lib/utils";
import { MessageAuthor } from "./MessageAuthor";
import { MessageContent } from "./MessageContent";
import { MessageTimestamp } from "./MessageTimestamp";
import { useMessageVariant } from "./providers/MessageProvider";

export interface MessageComponentProps {
  children: React.ReactNode;
}

export const MessageComponent  = ({ children }: MessageComponentProps) => {
  const variant = useMessageVariant();
  
  const getMessageComponentStyle = () => {
    switch (variant) {
      case "client":
        return "bg-gray-900";
      case "server":
        return "bg-gray-950";
      default:
        return "bg-gray-950";
    }
  };

  return (
    <div className={cn(getMessageComponentStyle(), "w-full px-3 py-1.5 rounded-xl")}>
      {children}
    </div>
  )
}

MessageComponent.Author = MessageAuthor;
MessageComponent.Content = MessageContent;
MessageComponent.Timestamp = MessageTimestamp;