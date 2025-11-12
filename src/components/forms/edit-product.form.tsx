import type { EditProductFormValues } from '@/schemas/product.schema'
import type { Product } from '@/types/entities'
import type { SubmitHandler } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { notifyAxiosError } from '@/helpers/notify-axios-error'
import { useUpdateProduct } from '@/hooks/api/products/use-update-product'
import { productSchema } from '@/schemas/product.schema'
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

type EditProductFormProps = {
  product: Product
  close: () => void
}

export default function EditProductForm({
  product,
  close,
}: EditProductFormProps) {
  const { mutateAsync: updateProduct } = useUpdateProduct()

  const { units: dosageUnits } = useDosageUnitsStore()
  const { ingredients } = useActiveIngredientsStore()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditProductFormValues>({
    defaultValues: {
      name: product.name,
      barcode: product.barcode,
      dosage: product.dosage,
      dosageUnitId: product.dosageUnitId,
      activeIngredientId: product.activeIngredientId,
    },
    resolver: zodResolver(productSchema),
  })

  const onSubmit: SubmitHandler<EditProductFormValues> = async (values) => {
    console.log(values)

    try {
      await updateProduct({ id: product.id, data: values })
    } catch (error) {
      notifyAxiosError(error)
    }
    close()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="edit_prod_form_name">Name</FieldLabel>
          <Input id="edit_prod_form_name" {...register('name')} />
          <InputErrorMessage text={errors.name?.message} />
        </Field>

        <Field>
          <FieldLabel htmlFor="edit_prod_form_barcode">Barcode</FieldLabel>
          <Input id="edit_prod_form_barcode" {...register('barcode')} />
          <InputErrorMessage text={errors.barcode?.message} />
        </Field>

        <Field>
          <FieldLabel htmlFor="edit_prod_form_dosage">Dosage</FieldLabel>
          <Input
            id="edit_prod_form_dosage"
            {...register('dosage', { valueAsNumber: true })}
            type="number"
          />
          <InputErrorMessage text={errors.dosage?.message} />
        </Field>

        <Field>
          <FieldLabel htmlFor="edit_prod_form_dosage_unit">
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
                <SelectTrigger id="edit_prod_form_dosage_unit">
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
          <FieldLabel htmlFor="edit_prod_form_ingredient">
            Active ingredient
          </FieldLabel>

          <SearchSelect
            labelledId="edit_prod_form_ingredient"
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
          <div className="flex gap-x-4 justify-end">
            <Button variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button type="submit">Update Product</Button>
          </div>
        </Field>
      </FieldGroup>
    </form>
  )
}
