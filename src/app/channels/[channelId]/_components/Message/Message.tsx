import { Message as MessageT } from "@/types/Message"
import { cn } from "@/lib/utils"
import { ShieldCheckIcon } from "@/components/ui/icons/ShieldCheckIcon";
import { UserCircleIcon } from "@/components/ui/icons/UserCircleIcon";

export interface MessageProps {
  message: MessageT
}

export const Message = ({ message }: MessageProps) => {
  const getMessageStyle = () => {
    switch (message.source) {
      case 'client':
        return 'bg-gray-900';
      case 'server':
        return 'bg-gray-950';
      default:
        return 'bg-gray-950';
    }
  }

  const getAuthorStyle = () => {
    switch (message.source) {
      case 'client':
        return 'text-white font-semibold';
      case 'server':
        return 'text-white font-semibold text-xs uppercase';
      default:
        return 'text-gray-500';
    }
  }

  const getContentStyle = () => {
    switch (message.source) {
      case 'client':
        return 'text-white text-base';
      case 'server':
        return 'text-white text-base';
      default:
        return 'text-gray-500';
    }
  }

  const getTimestampStyle = () => {
    switch (message.source) {
      case 'client':
        return 'text-gray-500';
      case 'server':
        return 'text-white';
      default:
        return 'text-gray-500';
    }
  }
  
  return (
    <div className={cn(getMessageStyle(), 'flex justify-between w-full gap-2 items-baseline-last px-3 py-1.5 rounded-xl')}>
      <div className="flex-grow">
        <div className="flex gap-2 divide-x-2 divide-gray-700">
          <div className={cn(getAuthorStyle())}>
            <div className="flex gap-1 items-center pr-2">
              {message.source === 'server' && <ShieldCheckIcon/>}
              {message.source === 'client' && <UserCircleIcon />}
              {message.author} 
            </div>
          </div>

          <div className={cn(getContentStyle(), "flex-grow ")}>
            {message.content}
            </div>
        </div>
      </div>

      <span className={cn(getTimestampStyle(),"text-xs bg-")}>
        {message.sent_at}
      </span>
    </div>
  );
};