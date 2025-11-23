import { z } from 'zod'

import { BATCHES } from '@/helpers/constants'

export const batchSchema = z
  .object({
    batchNumber: z
      .string()
      .min(3, 'Batch number must be at least 3 characters long')
      .max(50, 'Batch number must be at most 50 characters long'),

    qty: z.number().positive().min(1),

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

export const createBatchDefaultValues: CreateBatchFormValues = {
  batchNumber: '',
  description: '',
  productId: 0,
  storageId: 0,
  qty: 1,
  manufactureDate: null,
  expirationDate: null,
}

export const editBatchSchema = batchSchema.omit({
  storageId: true,
  qty: true,
})

export type EditBatchFormValues = z.infer<typeof editBatchSchema>

export const relocateBatchSchema = batchSchema.pick({
  qty: true,
  storageId: true,
})
export type RelocateBatchFormValues = z.infer<typeof relocateBatchSchema>
export const relocateDefaultValues: RelocateBatchFormValues = {
  qty: 1,
  storageId: 0,
}

export const writeOffBatchSchema = batchSchema.pick({
  qty: true,
})
export type WriteOffBatchFormValues = z.infer<typeof writeOffBatchSchema>
export const writeOffDefaultValues: WriteOffBatchFormValues = {
  qty: 1,
}

export const importBatchesSchema = z.object({
  file: z
    .instanceof(File, { message: 'File is required' })
    .nullable()
    .refine((v) => v !== null, {
      message: 'File is required',
    })
    .refine((file) => file && file.size <= BATCHES.MIN_IMPORT_FILE_SIZE, {
      message: `Max file size is ${BATCHES.MIN_IMPORT_FILE_SIZE}MB`,
    })
    .refine((file) => file && file.type === BATCHES.IMPORT_FILE_TYPE, {
      message: 'File must be an Excel .xlsx',
    }),
})
export type ImportBatchesFormValues = z.infer<typeof importBatchesSchema>
export const importBatchesDefaultValues: ImportBatchesFormValues = {
  file: null,
}
