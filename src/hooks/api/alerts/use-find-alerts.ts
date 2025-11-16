import type { Alert } from '@/types/entities'

import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/api'

export function useFindAlerts() {
  return useQuery({
    queryKey: ['alerts'],
    queryFn: async () => {
      const response = await api.get<Alert[]>('/alerts', {})

      return response.data
    },
    placeholderData: (previousData) => previousData,
  })
}
