export type Category = {
  id: number
  name: string
  description: string | null
}

export type Storage = {
  id: number
  name: string
  description: string | null
  temperature: number
}

export type CreateBatchBackendDTO = {
  batchNumber: string
  description?: string
  manufactureDate: string
  expirationDate: string
  productId: number
  quantity: number
  storageId: number
  categoryId: number
}

export type Batch = {
  id: number
  batchNumber: string
  description?: string
  manufactureDate: string
  expirationDate: string
  productId: number
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
