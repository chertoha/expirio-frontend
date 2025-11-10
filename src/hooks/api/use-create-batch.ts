import type { Batch, CreateBatchBackendDTO } from '@/types/entities'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/api'

export function useCreateBatch() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateBatchBackendDTO): Promise<Batch> => {
      const response = await api.post('/batches', data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['batches'] })
    },
  })
}
