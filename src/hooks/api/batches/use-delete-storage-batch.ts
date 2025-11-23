import type { StoragesBatch } from '@/types/entities'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/api'

export type DeleteStorageBatchData = {
  storageId: number
  batchId: number
}

export function useDeleteStorageBatch() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (
      data: DeleteStorageBatchData,
    ): Promise<StoragesBatch> => {
      const response = await api.delete(`/batches/storage-batch`, { data })
      return response.data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['batches'] })
    },
  })
}
