import type { Batch } from '@/types/entities'

import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/api'
import { useBatchesStore } from '@/store/use-batches.store'
import { BatchStatus } from '@/types/common'

type BatchesResponse = {
  data: Batch[]
  page: number
  limit: number
  totalElements: number
}

export function useFindBatches() {
  const {
    page,
    limit,
    search,
    sort,
    status,
    productId,
    categoryId,
    storageId,
  } = useBatchesStore()

  return useQuery<BatchesResponse>({
    queryKey: [
      'batches',
      { page, limit, search, sort, status, productId, categoryId, storageId },
    ],
    queryFn: async () => {
      const response = await api.get<BatchesResponse>('/batches', {
        params: {
          page,
          limit,
          search,
          sort,
          ...(status && { status }),
          ...(productId && { productId }),
          ...(categoryId && { categoryId }),
          ...(storageId && { storageId }),
        },
      })
      return response.data
    },
    placeholderData: (previousData) => previousData,
  })
}

export function useFindAllBatches() {
  return useQuery<Batch[]>({
    queryKey: ['all-batches'],
    queryFn: async () => {
      const checkResponse = await api.get<BatchesResponse>('/batches', {
        params: { expired: true },
      })

      const response = await api.get<BatchesResponse>('/batches', {
        params: {
          page: 1,
          limit: checkResponse.data.totalElements,
        },
      })

      return response.data.data
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
          status: BatchStatus.EXPIRED,
          page: 1,
          limit: checkResponse.data.totalElements,
        },
      })

      return response.data.data
    },
    placeholderData: (previousData) => previousData,
  })
}
