// import type { Batch } from '@/types/entities'

// import { useMutation, useQueryClient } from '@tanstack/react-query'

// import { api } from '@/lib/api'

// export function useUpdateBatch() {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: async ({
//       id,
//       data,
//     }: {
//       id: number
//       data: CreateBatchDTO
//     }): Promise<Batch> => {
//       const response = await api.put(`/batches/${id}`, data)
//       return response.data
//     },

//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['batches'] })
//     },
//   })
// }
