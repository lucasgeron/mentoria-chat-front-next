import { Tag } from "./Tag"

export type Channel = {
  id: number
  name: string,
  tag: Tag,
  max_users: number
}