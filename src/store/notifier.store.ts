// import { create } from 'zustand'

// type NotifierSeverity = 'success' | 'error' | 'info' | 'warning'

// type NotifierState = {
//   open: boolean
//   message: string
//   severity: NotifierSeverity
//   showNotifier: (message: string, severity?: NotifierSeverity) => void
//   closeNotifier: () => void
// }

// export const useNotifierStore = create<NotifierState>((set) => ({
//   open: false,
//   message: '',
//   severity: 'info',

//   showNotifier: (message, severity = 'info') =>
//     set({ open: true, message, severity }),

//   closeNotifier: () => set({ open: false }),
// }))

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
