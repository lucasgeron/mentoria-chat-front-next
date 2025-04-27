import { useRouter } from "next/navigation";
import { ChannelAction } from "../types";
import { deleteCookie, getCookie } from "cookies-next";
import { toast } from "sonner";


export const useChannelActions = () => { 
  const router = useRouter();
  const authorCookie = getCookie("author") || null;

  const actions: ChannelAction[] = [
    {
      label: 'Leave Channel',
      action: () => handleAction('LEAVE_CHANNEL'),
      context: ["room"]
    },
    {
      label: 'Back to Channels',
      action: () => handleAction('BACK_TO_CHANNELS'),
      context: ["lobby"]
    }
  ]

  if (authorCookie) {
    actions.push(
      {
        label: 'Change Name',
        action: () => handleAction('RESET_NAME'),
        context: ["room", "lobby"]
      }
    )
  }

  const handleAction = (item: string) => {
    switch (item) {
      case 'LEAVE_CHANNEL':
      case 'BACK_TO_CHANNELS':
        router.push("/channels");
        break;
      case 'RESET_NAME':
        deleteCookie("author");
        deleteCookie("skipDialogs");
        router.push("/channels");
        toast.success("Name reset successfully");
      default:
        break;
    }
  }

  return {
    actions
  }
}