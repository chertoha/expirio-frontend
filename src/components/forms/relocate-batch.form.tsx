import type { RelocateBatchFormValues } from '@/schemas/batch.schema'
import type { SubmitHandler } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { notifyAxiosError } from '@/helpers/notify-axios-error'
import { useRelocateBatch } from '@/hooks/api/batches/use-relocate-batch'
import { useListStorages } from '@/hooks/api/storages/use-list-storages'
import {
  relocateBatchSchema,
  relocateDefaultValues,
} from '@/schemas/batch.schema'

import InputErrorMessage from '../ui-kit/input-error-message'
import SearchSelect from '../ui-kit/search-select'
import { Button } from '../ui/button'
import { Field, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'

type RelocateBatchFormProps = {
  close: () => void
  batchId: number
  currentStorageId: number
  qtyLeft: number
}

export default function RelocateBatchForm({
  close,
  batchId,
  currentStorageId,
  qtyLeft,
}: RelocateBatchFormProps) {
  const { mutateAsync: relocateBatch } = useRelocateBatch()
  const { data: storages = [] } = useListStorages()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RelocateBatchFormValues>({
    defaultValues: relocateDefaultValues,
    resolver: zodResolver(relocateBatchSchema),
  })

  const onSubmit: SubmitHandler<RelocateBatchFormValues> = async (values) => {
    try {
      await relocateBatch({
        batchId,
        currentStorageId,
        nextStorageId: values.storageId,
        relocatedQty: values.qty,
      })
      close()
    } catch (error) {
      notifyAxiosError(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <div className="flex max-sm:flex-col gap-6">
          <Field>
            <FieldLabel htmlFor="relocate_batch_form_qty">
              Quantity to relocate
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

          <Field>
            <FieldLabel htmlFor="relocate_batch_form_storage">
              Storage to relocate
            </FieldLabel>
            <Controller
              control={control}
              name="storageId"
              render={({ field }) => (
                <SearchSelect
                  className="w-[200px]"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  options={storages.map(({ id, name }) => ({
                    label: name,
                    value: id,
                  }))}
                  placeholder="Select storage..."
                  isNumber
                />
              )}
            />
            <InputErrorMessage text={errors.storageId?.message} />
          </Field>
        </div>

        <Field>
          <div className="flex max-xs:flex-col gap-4 justify-end">
            <Button variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button type="submit">Relocate</Button>
          </div>
        </Field>
      </FieldGroup>
    </form>
  )
}
