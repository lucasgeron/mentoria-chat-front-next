export type Message = { 
  id: number
  content: string
  author: string
  channel_id: number
  sent_at: string
  source: 'server' | 'client'
}