import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export type LoginFormValues = z.infer<typeof loginFormSchema>

export const loginDefaultValues: LoginFormValues = {
  email: 'admin@email.com',
  password: '123456',
}
