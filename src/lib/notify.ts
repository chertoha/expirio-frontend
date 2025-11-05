import { toast } from 'sonner'

export const notify = {
  success: (msg: string) => toast.success(msg),
  error: (msg: string) => toast.error(msg),
  info: (msg: string) => toast(msg),
  warning: (msg: string) =>
    toast.warning
      ? toast.warning(msg)
      : toast(msg, { className: 'bg-yellow-100 text-yellow-800' }),
}
