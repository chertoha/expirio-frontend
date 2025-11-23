export type Category = {
  id: number
  name: string
  description: string | null

  products: Array<{ categoryId: number; productId: number }>
}

// export type Storage = {
//   id: number
//   name: string
//   description: string | null
//   temperature: number
// }

// export type Product = {
//   id: number
//   name: string
//   barcode: string
//   dosage: number
//   dosageUnitId: number
//   activeIngredientId: number
//   categories: Category[]
// }

export type Storage = {
  id: number
  name: string
  description: string | null
  temperature: string

  batches: Array<{ storageId: number; batchId: number; qty: number }>
}

export type StoragesBatch = {
  storageId: number
  batchId: number
  qty: number

  storage: Omit<Storage, 'batches'>
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

export type StoragesBatchListType = {
  storageId: number
  batchId: number
  qty: number
  batch: Batch
  storage: Omit<Storage, 'batches'>
}

// export type CreateBatchBackendDTO = {
//   batchNumber: string
//   description?: string
//   manufactureDate: string
//   expirationDate: string
//   productId: number
// }

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
  createdAt: Date
  updatedAt: Date
}

export type ProductCategory = {
  categoryId: number
  productId: number
  category: Category
}

export type DrugForm = {
  id: number
  name: string
}

export type ProductForm = {
  formId: number
  productId: number
  form: DrugForm
}

export type DosageUnit = {
  id: number
  name: string
}

export type ActiveIngredient = {
  id: number
  name: string
}

export type Product = {
  id: number
  name: string
  barcode: string
  dosage: number
  dosageUnitId: number
  activeIngredientId: number

  categories: ProductCategory[]

  dosageUnit: DosageUnit

  forms: ProductForm[]

  activeIngredient: ActiveIngredient
}

export type AlertRule = {
  id: string | number
  name: string
  daysLeft: number
  enabled: boolean
}

export type AlertType = 'EMAIL' | 'SMS' | 'PUSH'

export type AlertChannel = {
  id: number
  type: AlertType
}

export type Alert = {
  id: number
  name: string
  daysBefore: number
  isEnabled: boolean

  channels: AlertChannel[]
}
