import type { Storage } from '@/types/entities'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

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

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status

        if (status === 409) {
          throw new Error('Storage is not empty — cannot be deleted')
        }
      }
      throw error
    },
  })
}
