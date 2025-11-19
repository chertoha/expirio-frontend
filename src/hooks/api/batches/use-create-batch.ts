import type { Batch } from '@/types/entities'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/api'

export type CreateBatchData = {
  batchNumber: string
  productId: number
  manufactureDate: string
  expirationDate: string
  qty: number
  storageId: number
  description?: string
}

export function useCreateBatch() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateBatchData): Promise<Batch> => {
      const response = await api.post('/batches', data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['batches'] })
    },
  })
}
