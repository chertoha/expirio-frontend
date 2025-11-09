import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { api } from '@/lib/api'
import { useDosageUnitsStore } from '@/store/use-dosage-units.store'

export function useGetDosageUnits() {
  const { units, setUnits } = useDosageUnitsStore()

  const { data, isSuccess } = useQuery({
    queryKey: ['dosage-units'],
    queryFn: async () => {
      const { data } = await api.get('/dosage-units')
      return data
    },
    enabled: units.length === 0,
    staleTime: Infinity,
  })

  useEffect(() => {
    if (isSuccess && data) {
      setUnits(data)
    }
  }, [isSuccess, data, setUnits])

  return {
    units: units.length ? units : data,
    isLoading: !units.length && !data,
  }
}
