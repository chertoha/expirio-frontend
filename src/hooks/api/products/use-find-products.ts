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
