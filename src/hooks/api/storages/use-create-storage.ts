import type { Storage } from '@/types/entities'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/api'

export type CreateStorageData = {
  name: string
  description?: string | null
  temperature: string
}

export function useCreateStorage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateStorageData): Promise<Storage> => {
      const response = await api.post('/storages', data)
      return response.data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['storages'] })
    },
  })
}
