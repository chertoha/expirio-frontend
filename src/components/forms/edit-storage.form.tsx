import type { EditStorageFormValues } from '@/schemas/storage'
import type { Storage } from '@/types/entities'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import InputErrorMessage from '@/components/ui-kit/input-error-message'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useUpdateStorage } from '@/hooks/api/use-update-storage'
import { notify } from '@/lib/notify'
import { storageSchema } from '@/schemas/storage'

// import { storageSchema } from '@/utils/forms/storage'

export default function EditStorageForm({
  storage,
  close,
}: {
  storage: Storage
  close: () => void
}) {
  const { mutateAsync: updateStorage } = useUpdateStorage()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditStorageFormValues>({
    defaultValues: {
      name: storage.name,
      description: storage.description ?? '',
      temperatureLabel: storage.temperatureLabel,
    },
    resolver: zodResolver(storageSchema),
  })

  const onSubmit = async (values: EditStorageFormValues) => {
    try {
      await updateStorage({ id: storage.id, data: values })
    } catch {
      notify.error('Something went wrong')
    }
    close()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="edit_storage_name">Name</FieldLabel>
          <Input id="edit_storage_name" {...register('name')} />
          <InputErrorMessage text={errors.name?.message} />
        </Field>
        <Field>
          <FieldLabel htmlFor="edit_storage_description">
            Description
          </FieldLabel>
          <Textarea
            id="edit_storage_description"
            {...register('description')}
          />
          <InputErrorMessage text={errors.description?.message} />
        </Field>
        <Field>
          <FieldLabel htmlFor="edit_storage_temp">Temperature Label</FieldLabel>
          <Input id="edit_storage_temp" {...register('temperatureLabel')} />
          <InputErrorMessage text={errors.temperatureLabel?.message} />
        </Field>
        <Field>
          <div className="flex justify-end gap-3">
            <Button variant="outline" type="button" onClick={close}>
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </div>
        </Field>
      </FieldGroup>
    </form>
  )
}
