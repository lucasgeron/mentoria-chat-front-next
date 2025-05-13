import { useMessageVariant } from "./providers/MessageProvider";
import { cn } from "@/lib/utils";

export interface MessageTimestampProps {
  children?: React.ReactNode;
}

export const MessageTimestamp = ({ children }: MessageTimestampProps) => {
  const variant = useMessageVariant();

  const getTimestampStyle = () => {
    switch (variant) {
      case "client":
        return "text-gray-500";
      case "server":
        return "text-white";
    }
  };

  return (
    <div className={cn(getTimestampStyle(), "text-xs h-6 self-end flex items-center")}>
      {children}
    </div>
  )
}