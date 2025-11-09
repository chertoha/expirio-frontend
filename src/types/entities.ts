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
