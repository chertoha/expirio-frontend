import type { Batch } from '@/types/entities'

import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/api'
import { useBatchesStore } from '@/store/use-batches.store'

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
  const { page, limit, search, sort } = useBatchesStore()

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

export function useFindAllExpiredBatches() {
  return useQuery<Batch[]>({
    queryKey: ['expired-batches'],
    queryFn: async () => {
      const checkResponse = await api.get<BatchesResponse>('/batches', {
        params: { expired: true },
      })

      const response = await api.get<BatchesResponse>('/batches', {
        params: {
          expired: true,
          page: 1,
          limit: checkResponse.data.totalElements,
        },
      })

      return response.data.data
    },
    placeholderData: (previousData) => previousData,
  })
}
