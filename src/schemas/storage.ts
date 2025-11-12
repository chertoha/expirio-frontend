import { z } from 'zod'

export const storageSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'Name must be at most 50 characters long'),
  description: z
    .string()
    .max(200, 'Description must be at most 200 characters long')
    .optional()
    .or(z.literal('')),
  temperature: z.string().min(1, 'Temperature label is required'),
})

export type CreateStorageFormValues = z.infer<typeof storageSchema>
export type EditStorageFormValues = z.infer<typeof storageSchema>
