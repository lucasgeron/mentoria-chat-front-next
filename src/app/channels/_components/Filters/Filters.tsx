import { Button } from "@/components/ui/button"
import { MagnifyingGlassIcon } from "@/components/ui/icons/MagnifyingGlassIcon";
import { Tag } from "@/types/Tag";
import { useState } from "react";

export interface FiltersProps {
  tags: Tag[]
  onFilterChange: (filter: { tagName: string; query: string }) => void;
 }

export const Filters = ({ onFilterChange, tags }: FiltersProps) => {
  const [filteredTagName, setFilteredTagName] = useState<string>("All"); 
  const [query, setQuery] = useState<string>("");
  
  const getButtonVariant = (tagName: string) => filteredTagName === tagName ? "default" : "ghost";
  
  const handleFilterChange = (tagName: string ) => {
    onFilterChange({ tagName, query }); // update the filter in the parent component
    setFilteredTagName(tagName); // update the active filter tag
  }

  const handleQueryChange = (query: string) => {
    onFilterChange({ tagName: filteredTagName, query }); // update the filter in the parent component
    setQuery(query); // update the active filter tag
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg flex flex-col gap-2 mb-2">

      <div className="flex gap-2">
        <div className="border-gray-600 border p-2 px-4 rounded-lg gap-2 flex flex-col">
          <span className="text-sm font-medium"> Filter by Tag</span>
          <div className="flex gap-2 items-baseline">
            <Button variant={getButtonVariant("All")} className="text-sm" size={"sm"} onClick={() => handleFilterChange("All")}>All</Button>
            {tags.map((tag) => (
              <Button key={tag.id} variant={getButtonVariant(tag.name)} className="text-sm" size={"sm"} onClick={() => handleFilterChange(tag.name)}>
                {tag.name}
              </Button> 
            ))}
          </div>
        </div>

        <div className="border-gray-600 border p-2 px-4 rounded-lg gap-2 flex flex-col">
          <span className="text-sm font-medium"> Filter by Channel</span>
          <div className="flex gap-2 items-center">
            <input
              autoFocus={false}
              autoComplete="off"
              type="text"
              placeholder="Filter by channel name..."
              name="query"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              className="bg-gray-700 text-white py-2 px-4 w-60 rounded-lg text-sm ring-0 outline-none focus:ring-0 "
            />
            <MagnifyingGlassIcon />
          </div>
        </div>
      </div>


    </div>
  )
}