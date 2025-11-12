import type { Storage } from '@/types/entities'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/api'

export type UpdateStorageData = {
  name: string
  description?: string | null
  temperature: string
}

export function useUpdateStorage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number
      data: UpdateStorageData
    }): Promise<Storage> => {
      const response = await api.put(`/storages/${id}`, data)
      return response.data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['storages'] })
    },
  })
}
