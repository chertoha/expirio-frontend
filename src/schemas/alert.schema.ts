import { z } from 'zod'

export const alertSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(20, 'Name must be at most 20 characters long'),

  daysBefore: z.number().int().positive('Must be positive').min(1),

  channels: z
    .array(z.enum(['EMAIL', 'SMS', 'PUSH']))
    .min(1, 'At least one notification channel is required'),
})

export type AddAlertFormValues = z.infer<typeof alertSchema>

export const addAlertDefaultValues: AddAlertFormValues = {
  name: 'New Alert',
  daysBefore: 30,
  channels: [],
}
