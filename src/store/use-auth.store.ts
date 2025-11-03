import type { User } from '@/types/entities'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  user: User | null
  access_token: string | null
  isAuthenticated: boolean
  login: (user: User, access_token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      access_token: null,

      login: (user, access_token) =>
        set({ isAuthenticated: true, user, access_token }),

      logout: () =>
        set({ isAuthenticated: false, user: null, access_token: null }),
    }),
    { name: 'auth-storage' },
  ),
)
