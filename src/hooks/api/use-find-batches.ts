import type { Batch } from '@/types/entities'

import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/api'

export function useFindBatches() {
  return useQuery<Batch[]>({
    queryKey: ['batches'],
    queryFn: async () => {
      const response = await api.get<Batch[]>('/batches')
      return response.data
    },
    placeholderData: [],
  })
}
