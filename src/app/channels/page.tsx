import { ChannelList } from "./_components/ChannelList";
import { fetchChannels } from "./_lib/actions";

const Page = async () => { 
  const channels = await fetchChannels()

  return (
    <ChannelList channels={channels} />
  )
}

export default Page;