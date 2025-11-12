import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { api } from '@/lib/api'
import { useActiveIngredientsStore } from '@/store/use-active-ingredients.store'

export function useGetActiveIngredients() {
  const { ingredients, seIngredients } = useActiveIngredientsStore()

  const { data, isSuccess } = useQuery({
    queryKey: ['active-ingredients'],
    queryFn: async () => {
      const { data } = await api.get('/active-ingredients')
      return data
    },
    enabled: ingredients.length === 0,
    staleTime: Infinity,
  })

  useEffect(() => {
    if (isSuccess && data) {
      seIngredients(data)
    }
  }, [isSuccess, data, seIngredients])

  return {
    ingredients: ingredients.length ? ingredients : data,
    isLoading: !ingredients.length && !data,
  }
}
