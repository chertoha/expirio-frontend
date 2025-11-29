import { create } from 'zustand'

export type NotifierSeverity = 'success' | 'error' | 'info' | 'warning'

type NotifierState = {
  message: string
  severity: NotifierSeverity
  showNotifier: (message: string, severity?: NotifierSeverity) => void
}

export const useNotifierStore = create<NotifierState>((set) => ({
  message: '',
  severity: 'info',
  showNotifier: (message, severity = 'info') => set({ message, severity }),
}))
