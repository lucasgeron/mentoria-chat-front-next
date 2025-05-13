import { RoomDetails } from "@/types/RoomDetails";
import { SidebarAuthor } from "../SidebarAuthor";

interface SidebarAuthorsProps {
  authors: RoomDetails['authors'];
}

export const SidebarAuthors = ({ authors }: SidebarAuthorsProps) => {
  const handleOnClick = (author: string) => {
    // TODO: Implement /p <Author> <Message>
    console.log('Author clicked:', author);
  }

  return (
    <div className="flex flex-col gap-2">
        
      <p className="font-medium text-white text-sm text-end"> 
        <span className="inline-block h-2 w-2 rounded-full animate-caret-blink bg-green-600 mr-0.5" /> Online
      </p> 
      <ul className="space-y-2">
        {authors?.map((author, index) => (
          <SidebarAuthor key={index} author={author} onClick={() => handleOnClick(author)}/>
        ))}
      </ul>
    </div>
  )
}