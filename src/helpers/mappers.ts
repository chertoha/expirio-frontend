import type { CreateBatchData } from '@/hooks/api/batches/use-create-batch'
import type { EditBatchData } from '@/hooks/api/batches/use-edit-batch'
import type {
  CreateBatchFormValues,
  EditBatchFormValues,
} from '@/schemas/batch.schema'

export const mapBatchCreateData = ({
  manufactureDate,
  expirationDate,
  ...restValues
}: CreateBatchFormValues): CreateBatchData => ({
  ...restValues,
  manufactureDate: manufactureDate?.toISOString() ?? '',
  expirationDate: expirationDate?.toISOString() ?? '',
})

export const mapBatchUpdateData = ({
  manufactureDate,
  expirationDate,
  ...restValues
}: EditBatchFormValues): EditBatchData => ({
  ...restValues,
  manufactureDate: manufactureDate?.toISOString() ?? '',
  expirationDate: expirationDate?.toISOString() ?? '',
})
