import type { EditCategoryFormValues } from '@/utils/forms/category'
import type { SubmitHandler } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { categorySchema } from '@/utils/forms/category'
import { mockCategories } from '@/utils/mocks/categories'

import InputErrorMessage from '../ui-kit/input-error-message'
import { Button } from '../ui/button'
import { Field, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

type EditCategoryFormProps = {
  categoryId: number
  close: () => void
}

export default function EditCategoryForm({
  categoryId,
  close,
}: EditCategoryFormProps) {
  const category = mockCategories.find(({ id }) => categoryId === id)

  if (!category) return null

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditCategoryFormValues>({
    defaultValues: {
      name: category.name,
      description: category.description,
    },
    resolver: zodResolver(categorySchema),
  })

  const onSubmit: SubmitHandler<EditCategoryFormValues> = (values) => {
    console.log('Edit form sumbit, values: ', values)
    close()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="edit_form_name">Name</FieldLabel>
          <Input id="edit_form_name" {...register('name')} />
          <InputErrorMessage text={errors.name?.message} />
        </Field>

        <Field>
          <FieldLabel htmlFor="edit_form_desc">Description</FieldLabel>
          <Textarea id="edit_form_desc" {...register('description')} />
          <InputErrorMessage text={errors.description?.message} />
        </Field>

        <Field>
          <div className="flex gap-x-4 justify-end">
            <Button variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button type="submit">Edit Category</Button>
          </div>
        </Field>
      </FieldGroup>
    </form>
  )
}
