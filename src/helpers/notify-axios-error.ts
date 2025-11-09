import axios from 'axios'

import { notify } from '@/lib/notify'

export const notifyAxiosError = (error: unknown) => {
  const defaultMessage = 'Something went wrong'

  if (axios.isAxiosError<{ message: string }>(error)) {
    notify.error(error.response?.data.message || defaultMessage)
  } else {
    notify.error(defaultMessage)
  }
}
