import axios from 'axios'

import { notify } from '@/lib/notify'

export const notifyAxiosError = (error: unknown) => {
  const defaultMessage = 'Something went wrong'

  if (axios.isAxiosError(error)) {
    const msg = error.response?.data?.message || error.message
    return notify.error(msg || defaultMessage)
  }

  if (error instanceof Error) {
    return notify.error(error.message)
  }

  notify.error(defaultMessage)
}
