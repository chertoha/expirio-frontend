import type { StoragesBatchListType } from '@/types/entities'

import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/api'
import { useStorageBatchesStore } from '@/store/use-storage-batch.store'

type StorageBatchesResponse = {
  data: StoragesBatchListType[]
  page: number
  limit: number
  totalElements: number
}

export function useFindStorageBatches() {
  const { page, limit, search, sort } = useStorageBatchesStore()

  return useQuery<StorageBatchesResponse>({
    queryKey: ['batches', { page, limit, search, sort }],
    queryFn: async () => {
      const response = await api.get<StorageBatchesResponse>(
        '/batches/storage-batch',
        {
          params: { page, limit, search, sort },
        },
      )
      return response.data
    },
    placeholderData: (previousData) => previousData,
  })
}
