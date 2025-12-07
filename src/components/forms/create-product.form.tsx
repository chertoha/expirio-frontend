import type { CreateProductFormValues } from '@/schemas/product.schema'
import type { SubmitHandler } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { notifyAxiosError } from '@/helpers/notify-axios-error'
import { useCreateProduct } from '@/hooks/api/products/use-create-product'
import {
  createProductDefaultValues,
  productSchema,
} from '@/schemas/product.schema'
import { useActiveIngredientsStore } from '@/store/use-active-ingredients.store'
import { useDosageUnitsStore } from '@/store/use-dosage-units.store'

import InputErrorMessage from '../ui-kit/input-error-message'
import SearchSelect from '../ui-kit/search-select'
import { Button } from '../ui/button'
import { Field, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

type CreateProductFormProps = {
  close: () => void
}

export default function CreateProductForm({ close }: CreateProductFormProps) {
  const { mutateAsync: createProduct } = useCreateProduct()

  const { units: dosageUnits } = useDosageUnitsStore()
  const { ingredients } = useActiveIngredientsStore()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateProductFormValues>({
    defaultValues: createProductDefaultValues,
    resolver: zodResolver(productSchema),
  })

  const onSubmit: SubmitHandler<CreateProductFormValues> = async (values) => {
    try {
      await createProduct(values)
      close()
    } catch (error) {
      notifyAxiosError(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="create_prod_form_name">Name</FieldLabel>
          <Input id="create_prod_form_name" {...register('name')} />
          <InputErrorMessage text={errors.name?.message} />
        </Field>

        <Field>
          <FieldLabel htmlFor="create_prod_form_barcode">Barcode</FieldLabel>
          <Input id="create_prod_form_barcode" {...register('barcode')} />
          <InputErrorMessage text={errors.barcode?.message} />
        </Field>

        <Field>
          <FieldLabel htmlFor="create_prod_form_dosage">Dosage</FieldLabel>
          <Input
            id="create_prod_form_dosage"
            {...register('dosage', { valueAsNumber: true })}
            type="number"
          />
          <InputErrorMessage text={errors.dosage?.message} />
        </Field>

        <Field>
          <FieldLabel htmlFor="create_prod_form_dosage_unit">
            Dosage Unit
          </FieldLabel>

          <Controller
            control={control}
            name="dosageUnitId"
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(Number(value))
                }}
                value={field.value ? String(field.value) : ''}
              >
                <SelectTrigger id="create_prod_form_dosage_unit">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {dosageUnits.map(({ id, name }) => (
                      <SelectItem key={id} value={String(id)}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <InputErrorMessage text={errors.dosageUnitId?.message} />
        </Field>

        <Field>
          <FieldLabel htmlFor="create_prod_form_ingredient">
            Active ingredient
          </FieldLabel>

          <SearchSelect
            labelledId="create_prod_form_ingredient"
            name="activeIngredientId"
            control={control}
            options={ingredients.map(({ id, name }) => ({
              label: name,
              value: id,
            }))}
            isNumber
          />

          <InputErrorMessage text={errors.activeIngredientId?.message} />
        </Field>

        <Field>
          <div className="flex max-xs:flex-col gap-4 justify-end">
            <Button variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button type="submit">Create Product</Button>
          </div>
        </Field>
      </FieldGroup>
    </form>
  )
}
