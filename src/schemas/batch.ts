import { z } from 'zod'

export const batchSchema = z.object({
  batchNumber: z
    .string()
    .min(3, 'Batch number must be at least 3 characters long')
    .max(50, 'Batch number must be at most 50 characters long'),

  description: z
    .string()
    .max(200, 'Description must be at most 200 characters long')
    .optional()
    .or(z.literal('')),

  productId: z.number().min(1, 'Product is required'),
  storageId: z.number().min(1, 'Storage is required').optional(),
  qty: z.number().min(1, 'Quantity is required').optional(),

  manufactureDate: z.date().refine((date) => date <= new Date(), {
    message: 'Manufacture date cannot be in the future',
  }),

  expirationDate: z.date().refine((date) => date > new Date(), {
    message: 'Expiration date must be in the future',
  }),
})

export type CreateBatchFormValues = z.infer<typeof batchSchema>

export const createBatchDefaultValues: CreateBatchFormValues = {
  batchNumber: '',
  description: '',
  productId: 0,
  storageId: 0,
  qty: 0,
  manufactureDate: new Date(),
  expirationDate: new Date(),
}
