import { Tag } from "./Tag"

export type Room = {
  id: number
  name: string,
  tag: Tag,
  max_users: number
}