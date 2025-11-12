import type { Category } from '@/types/entities'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CategoryListState {
  categoryList: Category[]
  setCategoryList: (list: Category[]) => void
}

export const useCategoryListStore = create<CategoryListState>()(
  persist(
    (set) => ({
      categoryList: [],
      setCategoryList: (categoryList) => set({ categoryList }),
    }),
    { name: 'category-list-storage' },
  ),
)
