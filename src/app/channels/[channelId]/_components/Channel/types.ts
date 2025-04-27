import { JSX } from "react";

export type ChannelAction = {
  label: string | JSX.Element;
  action: () => void;
  context: Array<"lobby" | "room">;
}