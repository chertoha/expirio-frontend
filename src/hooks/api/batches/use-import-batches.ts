import type { Batch } from '@/types/entities'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/api'

export type ImportBatchesData = {
  file: File
}

export function useImportBatches() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: ImportBatchesData): Promise<Batch[]> => {
      const response = await api.post('/batches/import-excel', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['batches'] })
    },
  })
}
