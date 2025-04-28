import { useMessageVariant } from "./providers/MessageProvider";
import { cn } from "@/lib/utils";
import { ShieldCheckIcon } from "@/components/ui/icons/ShieldCheckIcon";
import { UserCircleIcon } from "@/components/ui/icons/UserCircleIcon";

export interface MessageAuthorProps {
  children?: React.ReactNode;
}

export const MessageAuthor = ({ children }: MessageAuthorProps) => {
  const variant = useMessageVariant();

  const getAuthorStyle = () => {
    switch (variant) {
      case "client":
        return "text-white font-sans font-semibold";
      case "server":
        return "text-white font-sans font-semibold text-xs uppercase";
    }
  };

  return (
    <div className={cn(getAuthorStyle())}>
      <div className="flex gap-1 items-center pr-2 h-6">
        {variant === "server" && <ShieldCheckIcon />}
        {variant === "client" && <UserCircleIcon />}
       {children}
      </div>
    </div>
  );
};