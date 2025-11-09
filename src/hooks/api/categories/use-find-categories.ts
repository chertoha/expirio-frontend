import type { CategoriesResponse } from '@/types/responses'

import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/api'
import { useCategoriesStore } from '@/store/use-categories.store'

export function useFindCategories() {
  const { page, limit, search, sort } = useCategoriesStore()

  return useQuery({
    queryKey: ['categories', { page, limit, search, sort }],
    queryFn: async () => {
      const response = await api.get<CategoriesResponse>('/categories', {
        params: { page, limit, search, sort },
      })

      return response.data
    },
    placeholderData: (previousData) => previousData,
  })
}
