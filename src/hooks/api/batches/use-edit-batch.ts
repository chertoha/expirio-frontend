import type { StoragesBatch } from '@/types/entities'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/api'

export type EditBatchData = {
  productId: number
  batchNumber: string
  manufactureDate: string
  expirationDate: string
  description?: string
}

export function useEditBatch() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number
      data: EditBatchData
    }): Promise<StoragesBatch> => {
      const response = await api.patch(`/batches/${id}`, data)
      return response.data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['batches'] })
    },
  })
}
