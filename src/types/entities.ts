export type Category = {
  id: number
  name: string
  description: string | null
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

export type Storage = {
  id: number
  name: string
  description: string | null
  temperatureLabel: string
}

export type AlertRule = {
  id: string | number
  name: string
  daysLeft: number
  enabled: boolean
}
