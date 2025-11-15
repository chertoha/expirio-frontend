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

type BatchesQuery = {
  expired?: boolean
}

export function useFindBatches({ expired }: BatchesQuery = {}) {
  const { page, limit, search, sort } = useCategoriesStore()
  return useQuery<BatchesResponse>({
    queryKey: ['batches', { page, limit, search, sort, expired }],
    queryFn: async () => {
      const response = await api.get<BatchesResponse>('/batches', {
        params: { page, limit, search, sort, expired },
      })
      return response.data
    },
    placeholderData: (previousData) => previousData,
  })
}
