import type { Product } from '@/types/entities'

import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/api'

type ProductsResponse = {
  data: Product[]
  page: number
  limit: number
  totalElements: number
}

export function useFindProducts() {
  return useQuery<ProductsResponse>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await api.get<ProductsResponse>('/products')
      return response.data
    },
    placeholderData: { data: [], page: 1, limit: 10, totalElements: 0 }, // ✅ масив порожній
  })
}
