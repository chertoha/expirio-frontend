import type { Batch } from '@/types/entities'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/api'

export type WriteOffBatchData = {
  batchId: number
  storageId: number
  qty: number
}

export function useWriteOffBatch() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: WriteOffBatchData): Promise<Batch> => {
      const response = await api.post('/batches/write-off', data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['batches'] })
    },
  })
}
