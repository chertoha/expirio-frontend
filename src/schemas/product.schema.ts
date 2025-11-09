import { z } from 'zod'

export const productSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(100, 'Name must be at most 100 characters long'),

  barcode: z.string().max(13, 'Barcode must be at most 13 characters long'),

  dosage: z.number().min(1, { message: 'Dosage is required' }),

  dosageUnitId: z.number().min(1, { message: 'Dosage unit is required' }),

  activeIngredientId: z
    .number()
    .min(1, { message: 'Active ingredient is required' }),
})

export type CreateProductFormValues = z.infer<typeof productSchema>
export type EditProductFormValues = CreateProductFormValues

export const createProductDefaultValues: CreateProductFormValues = {
  name: '',
  barcode: '',
  dosage: 0,
  dosageUnitId: 0,
  activeIngredientId: 0,
}
