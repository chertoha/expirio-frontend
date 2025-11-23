import type { CreateBatchFormValues } from '@/schemas/batch.schema'
import type { SubmitHandler } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { mapBatchCreateData } from '@/helpers/mappers'
import { notifyAxiosError } from '@/helpers/notify-axios-error'
import { useCreateBatch } from '@/hooks/api/batches/use-create-batch'
import { useFindAllProducts } from '@/hooks/api/products/use-find-products'
import { useListStorages } from '@/hooks/api/storages/use-list-storages'
import { batchSchema, createBatchDefaultValues } from '@/schemas/batch.schema'

import InputErrorMessage from '../ui-kit/input-error-message'
import SearchSelect from '../ui-kit/search-select'
import { Button } from '../ui/button'
import { Field, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

type CreateBatchFormProps = {
  close: () => void
}

export default function CreateBatchForm({ close }: CreateBatchFormProps) {
  const { mutateAsync: createBatch } = useCreateBatch()
  const { data: storages = [] } = useListStorages()
  const { data: products = [] } = useFindAllProducts()

  const [openManCalendar, setOpenManCalendar] = useState(false)
  const [openExpCalendar, setOpenExpCalendar] = useState(false)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBatchFormValues>({
    defaultValues: createBatchDefaultValues,
    resolver: zodResolver(batchSchema),
  })

  const onFormSubmit: SubmitHandler<CreateBatchFormValues> = async (values) => {
    try {
      await createBatch(mapBatchCreateData(values))
      close()
    } catch (error) {
      notifyAxiosError(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <FieldGroup>
        {/* Batch number */}
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
                        // setDate(date)
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
                        // setDate(date)
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

        <div className="flex gap-x-6">
          <Field>
            <FieldLabel htmlFor="create_batch_form_qty">Quantity</FieldLabel>
            <Input
              id="create_batch_form_qty"
              {...register('qty', { valueAsNumber: true })}
              placeholder="Quantity"
            />
            <InputErrorMessage text={errors.qty?.message} />
          </Field>

          <Field>
            <FieldLabel htmlFor="create_batch_form_storage">Storage</FieldLabel>
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
            <Button type="submit">Create batch</Button>
          </div>
        </Field>
      </FieldGroup>
    </form>
  )
}
