import { Channel } from "@/types/Channel";
import { Tag } from "@/types/Tag";
import { useState } from "react";

export interface FilterProps {
  tagName?: string;
  query?: string;
}

export const useFilteredChannels = (channels: Channel[]) => {
  const [filteredChannels, setFilteredChannels] = useState<Channel[]>(channels);

  const handleFilterChange = ({tagName, query} : FilterProps) => {
    if (!tagName && !query) return setFilteredChannels(channels);
      
    if (query) {
      console.log("query", query);
      const filtered = channels.filter(channel => channel.name.toLowerCase().includes(query.toLowerCase()));
      setFilteredChannels(filtered);
    } else {
      setFilteredChannels(channels);
    }

    if (tagName !== "All") {
      setFilteredChannels((prevChannels) => prevChannels.filter(channel => channel.tag.name === tagName));
    } 

  };

  const filteredTags = () : Tag[] => {
    const uniqueTags: Tag[] = [];

    channels.forEach(channel => {
      if (!uniqueTags.some(tag => tag.name === channel.tag.name)) {
        uniqueTags.push(channel.tag);
      }
    });

    return uniqueTags;
  };

  return { 
    filteredChannels: filteredChannels.sort((a, b) => a.name.localeCompare(b.name)),
    filteredTags: filteredTags(),
    handleFilterChange
  };
}