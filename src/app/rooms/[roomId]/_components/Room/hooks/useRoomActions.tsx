import { useRouter } from "next/navigation";
import { RoomAction } from "../types";
import { deleteCookie, getCookie } from "cookies-next";
import { toast } from "sonner";


export const useRoomActions = () => { 
  const router = useRouter();
  const authorCookie = getCookie("author") || null;

  const actions: RoomAction[] = [
    {
      label: 'Leave Room',
      action: () => handleAction('LEAVE_ROOM'),
      context: ["room"]
    },
    {
      label: 'Back to All Rooms',
      action: () => handleAction('BACK_TO_ALL_ROOMS'),
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
      case 'LEAVE_ROOM':
      case 'BACK_TO_ALL_ROOMS':
        router.push("/rooms");
        break;
      case 'RESET_NAME':
        deleteCookie("author");
        deleteCookie("skipDialogs");
        window.location.reload(); // We dont use router here to avoid caching states
        toast.success("Name reset successfully");
      default:
        break;
    }
  }

  return {
    actions
  }
}