import type { Batch } from '@/types/entities'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/api'

export type RelocateBatchData = {
  batchId: number
  currentStorageId: number
  nextStorageId: number
  relocatedQty: number
}

export function useRelocateBatch() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: RelocateBatchData): Promise<Batch> => {
      const response = await api.post('/batches/relocate', data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['batches'] })
    },
  })
}
