import { cookies } from "next/headers";
import { fetchChannel } from "../_lib/actions";
import { ChannelPage } from "./_components/ChannelPage";

const Page = async ({ params }: { params: { channelId: string } }) => {
  const { channelId } = params;
  const cookieStore = await cookies();
  const author = cookieStore.get("author")?.value ?? null;
  const channel = await fetchChannel(channelId);

  return (
    <ChannelPage channel={channel} author={author} />
  );
};

export default Page;