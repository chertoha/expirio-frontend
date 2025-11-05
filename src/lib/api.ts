import axios from 'axios'

import { useAuthStore } from '@/store/use-auth.store'

import { notify } from './notify'

const BASE_URL = import.meta.env.VITE_API_URL

export const api = axios.create({
  baseURL: BASE_URL + '/api',
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().access_token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    const requestUrl = error?.config?.url || ''

    if (status === 401) {
      const { logout } = useAuthStore.getState()

      if (requestUrl.includes('/auth/login')) {
        notify.error('Wrong email or password')
      } else {
        logout()
        notify.error('Session expired. Please log in again.')
      }
    }

    return Promise.reject(error)
  },
)
