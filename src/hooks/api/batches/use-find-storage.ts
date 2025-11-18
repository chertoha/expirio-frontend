// import type { Storage } from '@/types/entities'

// import { useQuery } from '@tanstack/react-query'

// import { api } from '@/lib/api'

// export function useFindStorage() {
//   return useQuery<Storage[]>({
//     queryKey: ['storages'],
//     queryFn: async () => {
//       const response = await api.get<Storage[]>('/storages')
//       return response.data
//     },
//     placeholderData: [],
//   })
// }
