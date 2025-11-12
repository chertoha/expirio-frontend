import type { DosageUnit } from '@/types/entities'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface DosageUnitsState {
  units: DosageUnit[]
  setUnits: (units: DosageUnit[]) => void
}

export const useDosageUnitsStore = create<DosageUnitsState>()(
  persist(
    (set) => ({
      units: [],
      setUnits: (units) => set({ units }),
    }),
    { name: 'dosage-units-storage' },
  ),
)
