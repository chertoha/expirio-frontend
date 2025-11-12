import type { Category } from '@/types/entities'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/api'

export type CreateProductData = {
  name: string
  barcode: string
  dosage: number
  dosageUnitId: number
  activeIngredientId: number
}

export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateProductData): Promise<Category> => {
      const response = await api.post('/products', data)
      return response.data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}
