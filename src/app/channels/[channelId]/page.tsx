import { fetchChannel } from "../_lib/actions";
import { ChannelPage } from "./_components/ChannelPage";

const Page = async ({ params }: { params: { channelId: string } }) => {
  const { channelId } = params;
  const channel = await fetchChannel(channelId);

  return (
    <ChannelPage channel={channel} />
  );
};

export default Page;