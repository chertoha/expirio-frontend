export type Category = {
  id: number
  name: string
  description: string
}

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
  createdAt: Date
  updatedAt: Date
}
