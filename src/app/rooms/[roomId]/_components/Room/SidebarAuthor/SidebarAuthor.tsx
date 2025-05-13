import { UserCircleIcon } from "@/components/ui/icons/UserCircleIcon";

interface SidebarAuthorProps {
  author: string;
  onClick?: () => void;
}

export const SidebarAuthor = ({author, onClick = () => {}}: SidebarAuthorProps) => {
  return (
     <li className="text-gray-300 bg-gray-700 text-sm p-2 rounded-md hover:bg-gray-600 transition cursor-pointer flex gap-1" onClick={onClick}>
        <UserCircleIcon /> <span className="text-white font-sans font-semibold">{author}</span>
      </li>
  )
}