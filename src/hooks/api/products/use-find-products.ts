import type { ProductsResponse } from '@/types/responses'

import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/api'
import { useProductsStore } from '@/store/use-products.store'

export function useFindProducts() {
  const { page, limit, search, sort, categoryId, activeIngredientId } =
    useProductsStore()

  return useQuery({
    queryKey: [
      'products',
      { page, limit, search, sort, activeIngredientId, categoryId },
    ],
    queryFn: async () => {
      const response = await api.get<ProductsResponse>('/products', {
        params: {
          page,
          limit,
          search,
          sort,
          ...(categoryId && { categoryId }),
          ...(activeIngredientId && { activeIngredientId }),
        },
      })

      return response.data
    },
    placeholderData: (previousData) => previousData,
  })
}

export function useFindAllProducts() {
  return useQuery({
    queryKey: ['products-all'],
    queryFn: async () => {
      const baseResponse = await api.get<ProductsResponse>('/products')

      const response = await api.get<ProductsResponse>('/products', {
        params: { page: 1, limit: baseResponse.data.totalElements },
      })

      return response.data.data
    },
  })
}
