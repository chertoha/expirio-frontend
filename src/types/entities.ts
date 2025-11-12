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

export type Product = {
  id: number
  name: string
  barcode: string
  dosage: number
  dosageUnitId: number
  activeIngredientId: number
  categories: Category[]
}
export type StoragesBatch = {
  storageId: number
  batchId: number
  qty: number
}
export type Batch = {
  id: number
  batchNumber: string
  description?: string
  manufactureDate: string
  expirationDate: string
  productId: number
  storages: StoragesBatch[]
  product: Product
}

export type CreateBatchBackendDTO = {
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
