import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/api'

export type UnassignCategoryData = {
  productIds: number[]
  categoryId: number
}

export function useUnassignCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UnassignCategoryData): Promise<unknown> => {
      const response = await api.post('/products/unassign-category', data)
      return response.data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}
