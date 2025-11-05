import { Toaster } from '@/components/ui/sonner'

export function AppNotifier() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        style: { borderRadius: '8px', fontSize: '14px' },
      }}
    />
  )
}
