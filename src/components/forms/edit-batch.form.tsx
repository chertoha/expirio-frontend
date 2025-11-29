import type { EditBatchFormValues } from '@/schemas/batch.schema'
import type { Batch } from '@/types/entities'
import type { SubmitHandler } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { mapBatchUpdateData } from '@/helpers/mappers'
import { notifyAxiosError } from '@/helpers/notify-axios-error'
import { useEditBatch } from '@/hooks/api/batches/use-edit-batch'
import { useFindAllProducts } from '@/hooks/api/products/use-find-products'
import { editBatchSchema } from '@/schemas/batch.schema'

import InputErrorMessage from '../ui-kit/input-error-message'
import SearchSelect from '../ui-kit/search-select'
import { Button } from '../ui/button'
import { Field, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

type EditBatchFormProps = {
  batch: Batch
  close: () => void
}

export default function CreateBatchForm({ close, batch }: EditBatchFormProps) {
  const { data: products = [] } = useFindAllProducts()
  const { mutateAsync: updateBatch } = useEditBatch()

  const [openManCalendar, setOpenManCalendar] = useState(false)
  const [openExpCalendar, setOpenExpCalendar] = useState(false)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditBatchFormValues>({
    defaultValues: {
      batchNumber: batch.batchNumber,
      productId: batch.productId,
      manufactureDate: new Date(batch.manufactureDate),
      expirationDate: new Date(batch.expirationDate),
    },
    resolver: zodResolver(editBatchSchema),
  })

  const onFormSubmit: SubmitHandler<EditBatchFormValues> = async (values) => {
    try {
      await updateBatch({ id: batch.id, data: mapBatchUpdateData(values) })
      close()
    } catch (error) {
      notifyAxiosError(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="batchNumber">Batch number *</FieldLabel>
          <Input
            id="batchNumber"
            {...register('batchNumber')}
            placeholder="Enter batch number"
          />
          <InputErrorMessage text={errors.batchNumber?.message} />
        </Field>

        <Field>
          <FieldLabel htmlFor="create_batch_form_product">Product</FieldLabel>
          <Controller
            control={control}
            name="productId"
            render={({ field }) => (
              <SearchSelect
                className="w-[200px]"
                value={field.value}
                onChange={(value) => field.onChange(value)}
                options={products.map(({ id, name }) => ({
                  label: name,
                  value: id,
                }))}
                placeholder="Select product..."
                isNumber
              />
            )}
          />
          <InputErrorMessage text={errors.productId?.message} />
        </Field>

        <div className="flex gap-x-6">
          <Field>
            <FieldLabel htmlFor="create_batch_form_manufacture_date">
              Manufacturing Date
            </FieldLabel>
            <Controller
              control={control}
              name="manufactureDate"
              render={({ field }) => (
                <Popover
                  open={openManCalendar}
                  onOpenChange={setOpenManCalendar}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-48 justify-between font-normal"
                    >
                      {field.value
                        ? field.value.toLocaleDateString()
                        : 'Select date'}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value || undefined}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        field.onChange(date)
                        setOpenManCalendar(false)
                      }}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />

            <InputErrorMessage text={errors.manufactureDate?.message} />
          </Field>

          <Field>
            <FieldLabel htmlFor="create_batch_form_expiration_date">
              Expiration Date
            </FieldLabel>

            <Controller
              control={control}
              name="expirationDate"
              render={({ field }) => (
                <Popover
                  open={openExpCalendar}
                  onOpenChange={setOpenExpCalendar}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-48 justify-between font-normal"
                    >
                      {field.value
                        ? field.value.toLocaleDateString()
                        : 'Select date'}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value || undefined}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        field.onChange(date)
                        setOpenExpCalendar(false)
                      }}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            <InputErrorMessage text={errors.expirationDate?.message} />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="create_batch_form_description">
            Description
          </FieldLabel>
          <Textarea
            id="create_batch_form_description"
            {...register('description')}
            placeholder="Add a short description..."
          />
          <InputErrorMessage text={errors.description?.message} />
        </Field>

        <Field>
          <div className="flex gap-x-4 justify-end">
            <Button variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button type="submit">Update batch</Button>
          </div>
        </Field>
      </FieldGroup>
    </form>
  )
}
