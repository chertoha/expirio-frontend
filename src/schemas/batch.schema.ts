import { z } from 'zod'

export const batchSchema = z
  .object({
    batchNumber: z
      .string()
      .min(3, 'Batch number must be at least 3 characters long')
      .max(50, 'Batch number must be at most 50 characters long'),

    qty: z.number().positive(),

    productId: z
      .number({ error: 'Product is required' })
      .min(1, { message: 'Product is required' }),

    storageId: z
      .number({ error: 'Product is required' })
      .min(1, 'Storage is required'),

    description: z
      .string()
      .max(200, 'Description must be at most 200 characters long')
      .optional(),

    manufactureDate: z
      .date()
      .nullable()
      .refine((v) => v !== null, {
        message: 'Manufacture date date is required',
      }),

    expirationDate: z
      .date()
      .nullable()
      .refine((v) => v !== null, {
        message: 'Expiration date date is required',
      }),
  })
  .refine(
    (data) =>
      data.manufactureDate !== null &&
      data.expirationDate !== null &&
      data.expirationDate > data.manufactureDate,
    {
      message: 'Manufacture date must be later than Expiration date',
      path: ['expirationDate'],
    },
  )

export type CreateBatchFormValues = z.infer<typeof batchSchema>
export type EditBatchFormValues = CreateBatchFormValues

export const createBatchDefaultValues: CreateBatchFormValues = {
  batchNumber: '',
  description: '',
  productId: 0,
  storageId: 0,
  qty: 1,
  manufactureDate: null,
  expirationDate: null,
}
