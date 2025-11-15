import type { Alert } from '@/types/entities'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/api'

export type EnableAlertData = {
  isEnabled: boolean
}

export function useEnableAlert() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number
      data: EnableAlertData
    }): Promise<Alert> => {
      const response = await api.patch(`/alerts/${id}/enable`, data)
      return response.data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] })
    },
  })
}
