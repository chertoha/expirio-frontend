import type { BatchStatus } from '@/types/common'
import type { PaginationQuery, SearchQuery, SortQuery } from '@/types/responses'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { BATCHES } from '@/helpers/constants'

interface BatchesState extends PaginationQuery, SortQuery, SearchQuery {
  setSearch: (search: string) => void
  setPage: (page: number) => void
  setLimit: (limit: number) => void
  setSort: (sort: string) => void
  reset: () => void

  status: BatchStatus | null
  setStatus: (status: BatchStatus | null) => void

  productId: number | null
  setProduct: (productId: number | null) => void

  categoryId: number | null
  setCategory: (categoryId: number | null) => void

  storageId: number | null
  setStorage: (storageId: number | null) => void
}
const { BATCHES_DEFAULT_LIMIT } = BATCHES

export const useBatchesStore = create<BatchesState>()(
  persist(
    (set) => ({
      search: '',
      page: 1,
      limit: BATCHES_DEFAULT_LIMIT,
      sort: 'id:asc',
      status: null,
      productId: null,
      categoryId: null,
      storageId: null,

      setSearch: (search) => set({ search, page: 1 }),
      setPage: (page) => set({ page }),
      setLimit: (limit) => set({ limit }),
      setSort: (sort) => set({ sort }),
      setStatus: (status) => set({ status }),
      setProduct: (productId) => set({ productId }),
      setCategory: (categoryId) => set({ categoryId }),
      setStorage: (storageId) => set({ storageId }),

      reset: () =>
        set({
          search: '',
          page: 1,
          limit: BATCHES_DEFAULT_LIMIT,
          sort: 'id:asc',
          status: null,
          productId: null,
          categoryId: null,
          storageId: null,
        }),
    }),
    {
      name: 'batches-filters-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        search: state.search,
        page: state.page,
        limit: state.limit,
        sort: state.sort,
        status: state.status,
      }),
    },
  ),
)
