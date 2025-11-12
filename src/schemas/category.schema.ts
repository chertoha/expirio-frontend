import { z } from 'zod'

export const categorySchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'Name must be at most 50 characters long'),
  description: z
    .string()
    .max(200, 'Description must be at most 200 characters long')
    .optional()
    .or(z.literal('')),
})

export type CreateCategoryFormValues = z.infer<typeof categorySchema>
export type EditCategoryFormValues = CreateCategoryFormValues

export const createCategoryDefaultValues: CreateCategoryFormValues = {
  name: '',
  description: '',
}
