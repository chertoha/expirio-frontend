import type { Alert, AlertType } from '@/types/entities'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/api'

export type CreateAlertData = {
  name: string
  daysBefore: number
  channels: AlertType[]
}

export function useAddAlert() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateAlertData): Promise<Alert> => {
      const response = await api.post('/alerts', data)
      return response.data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] })
    },
  })
}
