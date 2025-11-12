import type { Storage } from '@/types/entities'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/api'

export function useDeleteStorage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number): Promise<Storage> => {
      const response = await api.delete(`/storages/${id}`)
      return response.data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['storages'] })
    },
  })
}
