import type { CreateCategoryFormValues } from '@/utils/forms/category'
import type { SubmitHandler } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  categorySchema,
  createCategoryDefaultValues,
} from '@/utils/forms/category'

import InputErrorMessage from '../ui-kit/input-error-message'
import { Button } from '../ui/button'
import { Field, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

type CreateCategoryFormProps = {
  close: () => void
}

export default function CreateCategoryForm({ close }: CreateCategoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCategoryFormValues>({
    defaultValues: createCategoryDefaultValues,
    resolver: zodResolver(categorySchema),
  })

  const onSubmit: SubmitHandler<CreateCategoryFormValues> = (values) => {
    console.log('Create form sumbit, values: ', values)
    close()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="create_form_name">Name</FieldLabel>
          <Input id="create_form_name" {...register('name')} />
          <InputErrorMessage text={errors.name?.message} />
        </Field>

        <Field>
          <FieldLabel htmlFor="create_form_desc">Description</FieldLabel>
          <Textarea id="create_form_desc" {...register('description')} />
          <InputErrorMessage text={errors.description?.message} />
        </Field>

        <Field>
          <div className="flex gap-x-4 justify-end">
            <Button variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button type="submit">Create Category</Button>
          </div>
        </Field>
      </FieldGroup>
    </form>
  )
}
