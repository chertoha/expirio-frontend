import type { WriteOffBatchFormValues } from '@/schemas/batch.schema'
import type { SubmitHandler } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { notifyAxiosError } from '@/helpers/notify-axios-error'
import { useWriteOffBatch } from '@/hooks/api/batches/use-write-off-batch'
import {
  writeOffBatchSchema,
  writeOffDefaultValues,
} from '@/schemas/batch.schema'

import InputErrorMessage from '../ui-kit/input-error-message'
import { Button } from '../ui/button'
import { Field, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'

type WriteOffBatchFormProps = {
  close: () => void
  batchId: number
  storageId: number
  qtyLeft: number
}

export default function WriteOffBatchForm({
  close,
  batchId,
  storageId,
  qtyLeft,
}: WriteOffBatchFormProps) {
  const { mutateAsync: writeOffBatch } = useWriteOffBatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WriteOffBatchFormValues>({
    defaultValues: writeOffDefaultValues,
    resolver: zodResolver(writeOffBatchSchema),
  })

  const onSubmit: SubmitHandler<WriteOffBatchFormValues> = async (values) => {
    try {
      await writeOffBatch({ batchId, storageId, qty: values.qty })
      close()
    } catch (error) {
      notifyAxiosError(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <div className="flex gap-x-6">
          <Field>
            <FieldLabel htmlFor="relocate_batch_form_qty">
              Quantity to write-off
            </FieldLabel>
            <Input
              id="relocate_batch_form_qty"
              {...register('qty', { valueAsNumber: true })}
              placeholder="Quantity"
            />
            <InputErrorMessage text={errors.qty?.message} />

            <span className="text-sm text-slate-400 pl-2">
              Quantity left: {qtyLeft}
            </span>
          </Field>
        </div>

        <Field>
          <div className="flex gap-x-4 justify-end">
            <Button variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button type="submit">Write-off</Button>
          </div>
        </Field>
      </FieldGroup>
    </form>
  )
}
