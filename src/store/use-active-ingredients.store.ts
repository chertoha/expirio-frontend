import type { ActiveIngredient } from '@/types/entities'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ActiveIngredientsState {
  ingredients: ActiveIngredient[]
  seIngredients: (ingredients: ActiveIngredient[]) => void
}

export const useActiveIngredientsStore = create<ActiveIngredientsState>()(
  persist(
    (set) => ({
      ingredients: [],
      seIngredients: (ingredients) => set({ ingredients }),
    }),
    { name: 'active-ingredients-storage' },
  ),
)
