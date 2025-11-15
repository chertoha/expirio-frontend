import type { Alert } from '@/types/entities'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/api'

export function useDeleteAlert() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number): Promise<Alert> => {
      const response = await api.delete(`/alerts/${id}`)
      return response.data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] })
    },
  })
}
