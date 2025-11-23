import type { Storage } from '@/types/entities'

import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/api'

export function useListStorages() {
  return useQuery({
    queryKey: ['storages'],
    queryFn: async () => {
      const res = await api.get<Storage[]>('/storages')
      return res.data
    },
  })
}
