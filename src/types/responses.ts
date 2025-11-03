import type { User } from './entities'

export type AuthResponse = {
  user: User
  access_token: string
}
