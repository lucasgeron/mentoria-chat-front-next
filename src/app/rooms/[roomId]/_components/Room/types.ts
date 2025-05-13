import { JSX } from "react";

export type RoomAction = {
  label: string | JSX.Element;
  action: () => void;
  context: Array<"lobby" | "room">;
}