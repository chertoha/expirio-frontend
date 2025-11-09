import type { CategoriesResponse } from '@/types/responses'

import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { api } from '@/lib/api'
import { useCategoryListStore } from '@/store/use-category-list.store'

export function useGetCategoryList() {
  const { categoryList, setCategoryList } = useCategoryListStore()

  const { data, isSuccess } = useQuery({
    queryKey: ['category-list'],
    queryFn: async () => {
      const response = await api.get<CategoriesResponse>('/categories')

      const allDataResponse = await api.get<CategoriesResponse>('/categories', {
        params: { page: 1, limit: response.data.totalElements },
      })

      return allDataResponse.data.data
    },
    enabled: categoryList.length === 0,
    staleTime: Infinity,
  })

  useEffect(() => {
    if (isSuccess && data) {
      setCategoryList(data)
    }
  }, [data, isSuccess, setCategoryList])

  return {
    categoryList: categoryList.length ? categoryList : data,
    isLoading: !categoryList.length && !data,
  }
}
