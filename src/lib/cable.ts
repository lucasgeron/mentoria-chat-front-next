import { Consumer, createConsumer } from "@rails/actioncable";
import { Message } from "@/types/Message";
import { RoomDetails } from "@/types/RoomDetails";

let cable: Consumer | null = null;

export const createConnection = (author: string) => {
  cable = createConsumer(`ws://localhost:5000/cable?author=${encodeURIComponent(author)}`);
}

export const subscribeToRoom = ({
  roomId,
  onReceived = () => {}, 
  onRejected = () => {},
  onConnected = () => {},
  onDisconnected = () => {}
} : {
  roomId: string,
  onReceived?: (data: Message | RoomDetails) => void,
  onRejected?: () => void,
  onConnected?: () => void,
  onDisconnected?: () => void
}) => {
  if (!cable) {
    throw new Error("Cable connection not established.");
  }

  return cable.subscriptions.create(
    { channel: "RoomChannel", room_id: roomId },
    {
      connected() {
        onConnected();
        console.log(`Connected to room ${roomId}`);
      },
      disconnected() {
        onDisconnected();
        console.log(`Disconnected from room ${roomId}`);
      },
      rejected() {
        onRejected();
        console.error(`Subscription to room ${roomId} was rejected.`);
      },
      received(data: Message | RoomDetails) {
        onReceived(data);
      },
    }
  );
}
