'use client'

import { useCallback } from "react";

export interface RoomDetail {
  online: number;
  messages_count: number;
  last_message_at: string;
}

export type RoomDetailsMap = Record<string, RoomDetail>;

export function useRoomDetails(roomDetails: RoomDetailsMap) {
  return useCallback(
    (roomId: number | string) => {
      return roomDetails?.[roomId as string] || null;
    },
    [roomDetails]
  );
}
