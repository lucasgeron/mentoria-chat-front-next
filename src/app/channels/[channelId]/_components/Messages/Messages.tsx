import { Message as MessageT } from "@/types/Message"
import { Message } from "../Message";

interface MessagesProps { 
  messages: MessageT[]
}

export const Messages = ( {messages} : MessagesProps) => {
  return (
    <div
      className="h-[80dvh] overflow-y-auto p-4 bg-gray-800 rounded-lg scroll-smooth"
      ref={(el) => { if (el) { el.scrollTop = el.scrollHeight; } }} // scroll to bottom
    >
      <ul className="space-y-1.5">
        {messages.map((message, index) => (
          <li key={index}>
            <Message message={message}/>
          </li>
        ))}
      </ul>
    </div>
  )
}