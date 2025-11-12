import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/api'

export type AssignCategoryData = {
  productIds: number[]
  categoryId: number
}

export function useAssignCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: AssignCategoryData): Promise<unknown> => {
      const response = await api.post('/products/assign-category', data)
      return response.data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}
