import type { PaginationQuery, SearchQuery, SortQuery } from '@/types/responses'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { PRODUCTS } from '@/helpers/constants'

interface ProductsState extends PaginationQuery, SortQuery, SearchQuery {
  setSearch: (search: string) => void
  setPage: (page: number) => void
  setLimit: (limit: number) => void
  setSort: (sort: string) => void

  activeIngredientId: number | null
  categoryId: number | null
  setIngredient: (activeIngredientId: number | null) => void
  setCategory: (categoryId: number | null) => void

  reset: () => void
}

const { PRODUCTS_DEFAULT_LIMIT } = PRODUCTS

export const useProductsStore = create<ProductsState>()(
  persist(
    (set) => ({
      search: '',
      page: 1,
      limit: PRODUCTS_DEFAULT_LIMIT,
      sort: 'id:asc',

      activeIngredientId: null,
      categoryId: null,

      setSearch: (search) => set({ search, page: 1 }),
      setPage: (page) => set({ page }),
      setLimit: (limit) => set({ limit }),
      setSort: (sort) => set({ sort }),

      setIngredient: (activeIngredientId) =>
        set({ activeIngredientId, page: 1 }),
      setCategory: (categoryId) => set({ categoryId, page: 1 }),

      reset: () =>
        set({
          search: '',
          page: 1,
          limit: PRODUCTS_DEFAULT_LIMIT,
          sort: 'id:asc',
        }),
    }),

    {
      name: 'products-filters-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        search: state.search,
        page: state.page,
        limit: state.limit,
        sort: state.sort,
      }),
    },
  ),
)
