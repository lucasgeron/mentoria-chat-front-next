import { cookies } from "next/headers";
import { fetchRoom } from "./_lib/actions";
import { RoomPage } from "./_components/RoomPage";

const Page = async ({ params }: { params: Promise<{ roomId: string }> }) => {
  const { roomId } = await params;
  const cookieStore = await cookies();
  const author = cookieStore.get("author")?.value ?? null;
  const room = await fetchRoom(roomId);
  return (
    <RoomPage room={room} author={author} />
  );
};

export default Page;