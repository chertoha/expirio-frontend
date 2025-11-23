import type { CreateStorageFormValues } from '@/schemas/storage'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import InputErrorMessage from '@/components/ui-kit/input-error-message'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useCreateStorage } from '@/hooks/api/storages/use-create-storage'
import { notify } from '@/lib/notify'
import { storageSchema } from '@/schemas/storage'

export default function CreateStorageForm({ close }: { close: () => void }) {
  const { mutateAsync: createStorage } = useCreateStorage()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateStorageFormValues>({
    defaultValues: { name: '', description: '', temperature: '' },
    resolver: zodResolver(storageSchema),
  })

  const onSubmit = async (values: CreateStorageFormValues) => {
    try {
      await createStorage(values)
      close()
    } catch {
      notify.error('Something went wrong')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="create_storage_name">Name</FieldLabel>
          <Input id="create_storage_name" {...register('name')} />
          <InputErrorMessage text={errors.name?.message} />
        </Field>
        <Field>
          <FieldLabel htmlFor="create_storage_description">
            Description
          </FieldLabel>
          <Textarea
            id="create_storage_description"
            {...register('description')}
          />
          <InputErrorMessage text={errors.description?.message} />
        </Field>
        <Field>
          <FieldLabel htmlFor="create_storage_temp">
            Temperature Label
          </FieldLabel>
          <Input id="create_storage_temp" {...register('temperature')} />
          <InputErrorMessage text={errors.temperature?.message} />
        </Field>
        <Field>
          <div className="flex justify-end gap-3">
            <Button variant="outline" type="button" onClick={close}>
              Cancel
            </Button>
            <Button type="submit">Create Storage</Button>
          </div>
        </Field>
      </FieldGroup>
    </form>
  )
}
