import { Room } from "@/types/Room";
import { Tag } from "@/types/Tag";
import { useState } from "react";

export interface FilterProps {
  tagName?: string;
  query?: string;
}

export const useFilteredRooms = (rooms: Room[]) => {
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(rooms);

  const handleFilterChange = ({tagName, query} : FilterProps) => {
    if (!tagName && !query) return setFilteredRooms(rooms);
      
    if (query) {
      console.log("query", query);
      const filtered = rooms.filter(room => room.name.toLowerCase().includes(query.toLowerCase()));
      setFilteredRooms(filtered);
    } else {
      setFilteredRooms(rooms);
    }

    if (tagName !== "All") {
      setFilteredRooms((prevRooms) => prevRooms.filter(room => room.tag.name === tagName));
    }

  };

  const filteredTags = () : Tag[] => {
    const uniqueTags: Tag[] = [];

    rooms.forEach(room => {
      if (!uniqueTags.some(tag => tag.name === room.tag.name)) {
        uniqueTags.push(room.tag);
      }
    });

    return uniqueTags;
  };

  return { 
    filteredRooms: filteredRooms.sort((a, b) => a.name.localeCompare(b.name)),
    filteredTags: filteredTags(),
    handleFilterChange
  };
}