import type { Batch, Category, DosageUnit, Product, User } from './entities'

export type Pageable<T> = {
  data: T[]
  page: number
  limit: number
  totalElements: number
}

export type AuthResponse = {
  user: User
  access_token: string
}

export type CategoriesResponse = Pageable<Category>
export type BatchesResponse = Pageable<Batch>
export type ProductsResponse = Pageable<Product>
export type DosageUnitsResponse = Pageable<DosageUnit>
export interface PaginationQuery {
  page?: number
  limit?: number
}

export interface SortQuery {
  sort: string
}

export interface SearchQuery {
  search?: string
}
