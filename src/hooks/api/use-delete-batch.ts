import type { Batch } from '@/types/entities'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/api'

export function useDeleteBatch() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number): Promise<Batch> => {
      const response = await api.delete(`/batches/${id}`)
      return response.data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['batches'] })
    },
  })
}
