export type Message = { 
  type: 'Message'
  id: number
  content: string
  author: string
  roomId: number
  sentAt: string
  source: 'server' | 'client'
}