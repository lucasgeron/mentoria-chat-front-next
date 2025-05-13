import { Button } from "@/components/ui/button";
import { ArrowRightEndOnRectangleIcon } from "@/components/ui/icons/ArrowRightEndOnRectangleIcon";
import { Room as RoomT } from "@/types/Room";
import { useRouter } from "next/navigation";


export interface RoomProps {
  room: RoomT
}

export const Room = ({ room }: RoomProps) => { 
  const router = useRouter();

  const { name, max_users } = room;
  const tagName = room.tag.name;

  return (
    <div key={room.id} className="bg-gray-800 p-4 rounded-lg flex flex-col gap-2">
      <div className="flex gap-2 items-center justify-between w-full">
        <div className="flex gap-2 items-baseline">
          <p className="text-lg font-semibold mb-0">
            {name}
          </p>

          <div className="flex gap-2 items-center">
            <p className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
              {tagName}
            </p>

            <p className="text-xs bg-gray-700 text-white px-2 py-1 rounded-full flex gap-1">
              Max Users: <span className="font-bold">{max_users}</span>
            </p>
          </div>
        </div>

        <Button variant={"outline"} onClick={() => router.push(`/rooms/${room.id}`)} >
          <span>Join</span>
          <ArrowRightEndOnRectangleIcon />
        </Button>
      </div>
    </div>
  );
}