import { RoomList } from "./_components/RoomList";
import { fetchRooms } from "./_lib/actions";

const Page = async () => {
  const rooms = await fetchRooms();

  return (
    <RoomList rooms={rooms} />
  )
}

export default Page;