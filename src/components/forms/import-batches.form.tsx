import type { ImportBatchesFormValues } from '@/schemas/batch.schema'
import type { SubmitHandler } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { notifyAxiosError } from '@/helpers/notify-axios-error'
import { useImportBatches } from '@/hooks/api/batches/use-import-batches'
import {
  importBatchesDefaultValues,
  importBatchesSchema,
} from '@/schemas/batch.schema'

import InputErrorMessage from '../ui-kit/input-error-message'
import { Button } from '../ui/button'
import { Field, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'

type ImportBatchesFormProps = {
  close: () => void
}

export default function ImportBatchesForm({ close }: ImportBatchesFormProps) {
  const { mutateAsync: importBatches } = useImportBatches()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ImportBatchesFormValues>({
    defaultValues: importBatchesDefaultValues,
    resolver: zodResolver(importBatchesSchema),
  })

  console.log(errors)

  const onSubmit: SubmitHandler<ImportBatchesFormValues> = async (values) => {
    if (!values.file) return
    try {
      await importBatches({ file: values.file })
      close()
    } catch (error) {
      notifyAxiosError(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="import_batches_form_file">Name</FieldLabel>

          <Controller
            control={control}
            name="file"
            render={({ field }) => (
              <Input
                id="import_batches_form_file"
                type="file"
                onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                accept=".xlsx,.xls"
              />
            )}
          />
          <InputErrorMessage text={errors.file?.message} />
        </Field>

        <Field>
          <div className="flex gap-x-4 justify-end">
            <Button variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button type="submit">Import Batches</Button>
          </div>
        </Field>
      </FieldGroup>
    </form>
  )
}
