import type { CreateBatchFormValues } from '@/schemas/batch'
import type { SubmitHandler } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { Controller, useForm } from 'react-hook-form'

import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCreateBatch } from '@/hooks/api/batches/use-create-batch'
// import { useFindStorage } from '@/hooks/api/batches/use-find-storage'
import { useFindProducts } from '@/hooks/api/products/use-find-products'
import { useListStorages } from '@/hooks/api/storages/use-list-storages'
import { notify } from '@/lib/notify'
import { cn } from '@/lib/utils'
import { batchSchema, createBatchDefaultValues } from '@/schemas/batch'

import InputErrorMessage from '../ui-kit/input-error-message'
import { Button } from '../ui/button'
import { Field, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

type Props = {
  close: () => void
}

export default function CreateBatchForm({ close }: Props) {
  const { mutateAsync: createBatch } = useCreateBatch()
  // const { data: storages = [] } = useFindStorage()
  const { data: storages = [] } = useListStorages()

  const { data: productsResponse } = useFindProducts()

  const products = Array.isArray(productsResponse?.data)
    ? productsResponse.data
    : []

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBatchFormValues>({
    defaultValues: {
      ...createBatchDefaultValues,
      manufactureDate: new Date(),
    },
    resolver: zodResolver(batchSchema),
  })

  const onFormSubmit: SubmitHandler<CreateBatchFormValues> = async (values) => {
    try {
      const payload = {
        batchNumber: values.batchNumber,
        description: values.description,
        manufactureDate: values.manufactureDate?.toISOString(),
        expirationDate: values.expirationDate?.toISOString(),
        productId: values.productId!,
        qty: values.qty!,
        storageId: values.storageId!,
      }

      await createBatch(payload)
      close()
    } catch {
      notify.error('Something went wrong')
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

        {/* Product */}
        <Field>
          <FieldLabel htmlFor="productId">Product *</FieldLabel>
          <Controller
            control={control}
            name="productId"
            render={({ field }) => (
              <Select
                onValueChange={(val) => field.onChange(Number(val))}
                value={field.value?.toString()}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((p) => (
                    <SelectItem key={p.id} value={String(p.id)}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <InputErrorMessage text={errors.productId?.message} />
        </Field>

        {/* Storage */}
        <Field>
          <FieldLabel htmlFor="storageId">Storage</FieldLabel>
          <Controller
            control={control}
            name="storageId"
            render={({ field }) => (
              <Select
                onValueChange={(val) => field.onChange(Number(val))}
                value={field.value?.toString()}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select storage" />
                </SelectTrigger>
                <SelectContent>
                  {storages.map((s) => (
                    <SelectItem key={s.id} value={String(s.id)}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <InputErrorMessage text={errors.storageId?.message} />
        </Field>

        {/* Quantity */}
        <Field>
          <FieldLabel htmlFor="qty">Quantity</FieldLabel>
          <Controller
            control={control}
            name="qty"
            render={({ field }) => (
              <Select
                onValueChange={(val) => field.onChange(Number(val))}
                value={field.value?.toString()}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select quantity" />
                </SelectTrigger>
                <SelectContent>
                  {[100, 300, 500].map((qty) => (
                    <SelectItem key={qty} value={String(qty)}>
                      {qty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <InputErrorMessage text={errors.qty?.message} />
        </Field>

        {/* Expiration Date */}
        <Field>
          <FieldLabel htmlFor="expirationDate">Expiration Date *</FieldLabel>
          <Controller
            control={control}
            name="expirationDate"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn('w-full text-left font-normal')}
                  >
                    {field.value
                      ? format(field.value, 'PPP')
                      : 'Pick expiration date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="w-auto overflow-hidden p-0"
                >
                  <Calendar
                    mode="single"
                    selected={field.value || undefined}
                    captionLayout="dropdown"
                    onSelect={(date) => field.onChange(date || null)}
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          <InputErrorMessage text={errors.expirationDate?.message} />
        </Field>

        {/* Description */}
        <Field>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Textarea
            id="description"
            {...register('description')}
            placeholder="Add a short description..."
          />
          <InputErrorMessage text={errors.description?.message} />
        </Field>

        {/* Buttons */}
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
