import { Consumer, createConsumer } from "@rails/actioncable";
import { Message } from "@/types/Message";
import { RoomDetails } from "@/types/RoomDetails";

let cable: Consumer | null = null;

export const createConnection = (author?: string) => {
  let url = 'ws://localhost:5000/cable'
  if (author) {
    url = url.concat(`?author=${encodeURIComponent(author)}`)
  }
  cable = createConsumer(url);
}

export const subscribeToRooms = ({
  onReceived = () => {}, 
  onRejected = () => {},
  onConnected = () => {},
  onDisconnected = () => {}
}: {
  onReceived?: () => void,
  onRejected?: () => void,
  onConnected?: () => void,
  onDisconnected?: () => void
}) => {
   if (!cable) {
    throw new Error("Cable connection not established.");
  }

  return cable.subscriptions.create(
    { channel: "RoomsChannel" },
    {
      connected() {
        onConnected();
        console.log(`Connected to rooms channel`);
      },
      disconnected() {
        onDisconnected();
        console.log(`Disconnected from rooms channel`);
      },
      rejected() {
        onRejected();
        console.error('Subscription to rooms channel was rejected.');
      },
      received() {
        onReceived();
      },
    }
  );
}

export const subscribeToRoom = ({
  roomId,
  onReceived = () => {},
  onRejected = () => {},
  onConnected = () => {},
  onDisconnected = () => {}
}: {
  roomId: string
  onReceived?: (data: Message | RoomDetails ) => void,
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
