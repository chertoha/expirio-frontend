import type { CreateProductData } from './use-create-product'
import type { Product } from '@/types/entities'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/api'

export type UpdateProductData = CreateProductData

export function useUpdateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number
      data: UpdateProductData
    }): Promise<Product> => {
      const response = await api.patch(`/products/${id}`, data)
      return response.data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}
