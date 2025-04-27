import { useRouter } from "next/navigation";
import { ChannelAction } from "../types";

export const useChannelActions = () => { 
  const router = useRouter();

  const actions: ChannelAction[] = [
    {
      label: 'Leave Channel',
      action: () => handleAction('LEAVE_CHANNEL')
    }
  ]

  const handleAction = (item: string) => {
    switch (item) {
      case 'LEAVE_CHANNEL':
        router.push("/channels");
      default:
        break;
    }
  }

  return {
    actions
  }
}