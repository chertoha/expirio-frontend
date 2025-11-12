import type { Batch } from '@/types/entities'

import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/api'
import { useCategoriesStore } from '@/store/use-categories.store'

type BatchesResponse = {
  data: Batch[]
  page: number
  limit: number
  totalElements: number
}
export function useFindBatches() {
  const { page, limit, search, sort } = useCategoriesStore()
  return useQuery<BatchesResponse>({
    queryKey: ['batches', { page, limit, search, sort }],
    queryFn: async () => {
      const response = await api.get<BatchesResponse>('/batches', {
        params: { page, limit, search, sort },
      })
      return response.data
    },
    placeholderData: (previousData) => previousData,
  })
}
