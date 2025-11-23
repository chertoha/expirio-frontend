import type { PaginationQuery, SearchQuery, SortQuery } from '@/types/responses'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { STORAGE_BATCHES } from '@/helpers/constants'

interface StorageBatchesState extends PaginationQuery, SortQuery, SearchQuery {
  setSearch: (search: string) => void
  setPage: (page: number) => void
  setLimit: (limit: number) => void
  setSort: (sort: string) => void
  reset: () => void
}
const { STORAGE_BATCHES_DEFAULT_LIMIT } = STORAGE_BATCHES

export const useStorageBatchesStore = create<StorageBatchesState>()(
  persist(
    (set) => ({
      search: '',
      page: 1,
      limit: STORAGE_BATCHES_DEFAULT_LIMIT,
      sort: 'id:asc',

      setSearch: (search) => set({ search, page: 1 }),
      setPage: (page) => set({ page }),
      setLimit: (limit) => set({ limit }),
      setSort: (sort) => set({ sort }),

      reset: () =>
        set({
          search: '',
          page: 1,
          limit: STORAGE_BATCHES_DEFAULT_LIMIT,
          sort: 'batchId:asc',
        }),
    }),
    {
      name: 'storage-batches-filters-storage',
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
