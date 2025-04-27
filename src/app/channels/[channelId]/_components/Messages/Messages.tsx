import { Message } from "@/types/Message"

interface MessagesProps { 
  messages: Message[]
}

export const Messages = ( {messages} : MessagesProps) => {
  return (
    <div
      className="h-[80dvh] overflow-y-auto p-4 bg-gray-800 rounded-lg scroll-smooth"
      ref={(el) => { if (el) { el.scrollTop = el.scrollHeight; } }} // scroll to bottom
    >
      <ul className="space-y-2">
        {messages.map((msg, idx) => (
          <li key={idx} className="px-3 py-1.5 rounded-xl w-full gap-2 bg-gray-900 flex justify-between items-baseline-last ">
          
          <div className="">
            <div className="text-sm font-semibold text-gray-500">{msg.author}</div>
            <div className="text-base text-white flex-grow">{msg.content}</div>
          </div>
          
          <div className="text-xs text-gray-500">{new Date(msg.sent_at).toLocaleTimeString()}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}