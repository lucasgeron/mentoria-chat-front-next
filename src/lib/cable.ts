import { Consumer, createConsumer } from "@rails/actioncable";
import { Message } from "@/types/message";

let cable: Consumer | null = null;

export const createConnection = (author: string) => {
  cable = createConsumer(`ws://localhost:5000/cable?author=${encodeURIComponent(author)}`);
}

export function subscribeToChannel(channelId: string, callback: (data: Message) => void) {
  if (!cable) {
    throw new Error("Cable connection not established.");
  }

  return cable.subscriptions.create(
    { channel: "RoomChannel", channel_id: channelId },
    {
      connected() {
        console.log(`Connected to channel ${channelId}`);
      },
      disconnected() {
        console.log(`Disconnected from channel ${channelId}`);
      },
      received(data: Message) {
        console.log("Received data:", data);
        callback(data);
      },
    }
  );
}
