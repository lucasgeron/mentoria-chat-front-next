import { useRouter } from "next/navigation";
import { ChannelAction } from "../types";

export const useChannelActions = () => { 
  const router = useRouter();

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

  const handleAction = (item: string) => {
    switch (item) {
      case 'LEAVE_CHANNEL':
      case 'BACK_TO_CHANNELS':
        router.push("/channels");
        break;
      default:
        break;
    }
  }

  return {
    actions
  }
}