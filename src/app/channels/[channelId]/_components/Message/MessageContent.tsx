import { useMessageVariant } from "./providers/MessageProvider";
import { cn } from "@/lib/utils";

export interface MessageContentProps {
  children?: React.ReactNode;
}

export const MessageContent = ({ children }: MessageContentProps) => {
  const variant = useMessageVariant();

  const getContentStyle = () => {
    switch (variant) {
      case "client":
        return "text-white text-base";
      case "server":
        return "text-white text-base";
      default:
        return "text-gray-500";
    }
  };

  return <div className={cn(getContentStyle(), 'text-ellipsis overflow-hidden max-w-5xl')}>{children}</div>;
};