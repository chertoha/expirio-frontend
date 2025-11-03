import type { AuthResponse } from '@/types/responses'

import { useMutation } from '@tanstack/react-query'

import { api } from '@/lib/api'
import { useAuthStore } from '@/store/use-auth.store'

export interface Credentials {
  email: string
  password: string
}

export function useLogin() {
  const { login } = useAuthStore()

  return useMutation({
    mutationFn: async (creds: Credentials): Promise<AuthResponse> => {
      const response = await api.post('/auth/login', creds)
      return response.data
    },

    onSuccess: ({ user, access_token }) => {
      login(user, access_token)
    },

    onError: (error: any) => {
      console.error('Login failed:', error)
      throw error
    },
  })
}
