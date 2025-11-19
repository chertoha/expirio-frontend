import type { CreateBatchFormValues } from '@/schemas/batch.schema'
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

type EditBatchFormProps = {
  batch: Batch
  close: () => void
}

export default function CreateBatchForm({ close, batch }: EditBatchFormProps) {
  // const { mutateAsync: createBatch } = useCreateBatch()
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
    // defaultValues: {
    //   batchNumber: batch.batchNumber
    //   batchNumber: batch.productId
    //   batchNumber: batch.
    //   batchNumber: batch.batchNumber
    //   batchNumber: batch.batchNumber
    //   batchNumber: batch.batchNumber
    // },
    resolver: zodResolver(batchSchema),
  })

  const onFormSubmit: SubmitHandler<CreateBatchFormValues> = async (values) => {
    try {
      // await createBatch(mapBatchCreateData(values))
    } catch (error) {
      notifyAxiosError(error)
    }

    close()
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

// import type { CreateBatchFormValues } from '@/schemas/batch.schema'
// import type { Batch } from '@/types/entities'
// import type { SubmitHandler } from 'react-hook-form'

// import { zodResolver } from '@hookform/resolvers/zod'
// import { format } from 'date-fns'
// import { Controller, useForm } from 'react-hook-form'

// import { Calendar } from '@/components/ui/calendar'
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
// import { useCreateBatch } from '@/hooks/api/batches/use-create-batch'
// // import { useFindStorage } from '@/hooks/api/batches/use-find-storage'
// import { useFindProducts } from '@/hooks/api/products/use-find-products'
// import { useListStorages } from '@/hooks/api/storages/use-list-storages'
// import { notify } from '@/lib/notify'
// import { cn } from '@/lib/utils'
// import { batchSchema, createBatchDefaultValues } from '@/schemas/batch.schema'

// import InputErrorMessage from '../ui-kit/input-error-message'
// import { Button } from '../ui/button'
// import { Field, FieldGroup, FieldLabel } from '../ui/field'
// import { Input } from '../ui/input'
// import { Textarea } from '../ui/textarea'

// type Props = {
//   batch: Batch
//   close: () => void
// }

// export default function EditBatchForm({ batch, close }: Props) {
//   const { mutateAsync: createBatch } = useCreateBatch()
//   // const { data: storages = [] } = useFindStorage()
//   const { data: storages = [] } = useListStorages()
//   const { data: productsResponse } = useFindProducts()

//   const products = Array.isArray(productsResponse?.data)
//     ? productsResponse.data
//     : []

//   const {
//     control,
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<CreateBatchFormValues>({
//     defaultValues: {
//       ...createBatchDefaultValues,
//       manufactureDate: new Date(),
//     },
//     resolver: zodResolver(batchSchema),
//   })

//   const onFormSubmit: SubmitHandler<CreateBatchFormValues> = async (values) => {
//     try {
//       const payload = {
//         batchNumber: values.batchNumber,
//         description: values.description,
//         manufactureDate: values.manufactureDate?.toISOString(),
//         expirationDate: values.expirationDate?.toISOString(),
//         productId: values.productId!,
//         qty: values.qty!,
//         storageId: values.storageId!,
//       }

//       await createBatch(payload)
//       close()
//     } catch {
//       notify.error('Something went wrong')
//     }
//   }
//   console.log('edit', batch)
//   return (
//     <form onSubmit={handleSubmit(onFormSubmit)}>
//       <FieldGroup>
//         {/* Batch number */}
//         <Field>
//           <FieldLabel htmlFor="batchNumber">Batch number *</FieldLabel>
//           <Input
//             id="batchNumber"
//             {...register('batchNumber')}
//             placeholder="Enter batch number"
//           />
//           <InputErrorMessage text={errors.batchNumber?.message} />
//         </Field>

//         {/* Product */}
//         <Field>
//           <FieldLabel htmlFor="productId">Product *</FieldLabel>
//           <Controller
//             control={control}
//             name="productId"
//             render={({ field }) => (
//               <Select
//                 onValueChange={(val) => field.onChange(Number(val))}
//                 value={field.value?.toString()}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select product" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {products.map((p) => (
//                     <SelectItem key={p.id} value={String(p.id)}>
//                       {p.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             )}
//           />
//           <InputErrorMessage text={errors.productId?.message} />
//         </Field>

//         {/* Storage */}
//         <Field>
//           <FieldLabel htmlFor="storageId">Storage</FieldLabel>
//           <Controller
//             control={control}
//             name="storageId"
//             render={({ field }) => (
//               <Select
//                 onValueChange={(val) => field.onChange(Number(val))}
//                 value={field.value?.toString()}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select storage" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {storages.map((s) => (
//                     <SelectItem key={s.id} value={String(s.id)}>
//                       {s.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             )}
//           />
//           <InputErrorMessage text={errors.storageId?.message} />
//         </Field>

//         {/* Quantity */}
//         <Field>
//           <FieldLabel htmlFor="qty">Quantity</FieldLabel>
//           <Controller
//             control={control}
//             name="qty"
//             render={({ field }) => (
//               <Select
//                 onValueChange={(val) => field.onChange(Number(val))}
//                 value={field.value?.toString()}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select quantity" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {[100, 300, 500].map((qty) => (
//                     <SelectItem key={qty} value={String(qty)}>
//                       {qty}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             )}
//           />
//           <InputErrorMessage text={errors.qty?.message} />
//         </Field>

//         {/* Expiration Date */}
//         <Field>
//           <FieldLabel htmlFor="expirationDate">Expiration Date *</FieldLabel>
//           <Controller
//             control={control}
//             name="expirationDate"
//             render={({ field }) => (
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant="outline"
//                     className={cn('w-full text-left font-normal')}
//                   >
//                     {field.value
//                       ? format(field.value, 'PPP')
//                       : 'Pick expiration date'}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent align="start" className="p-0">
//                   <Calendar
//                     mode="single"
//                     selected={field.value || undefined}
//                     onSelect={(date) => field.onChange(date || null)}
//                     initialFocus
//                   />
//                 </PopoverContent>
//               </Popover>
//             )}
//           />
//           <InputErrorMessage text={errors.expirationDate?.message} />
//         </Field>

//         {/* Description */}
//         <Field>
//           <FieldLabel htmlFor="description">Description</FieldLabel>
//           <Textarea
//             id="description"
//             {...register('description')}
//             placeholder="Add a short description..."
//           />
//           <InputErrorMessage text={errors.description?.message} />
//         </Field>

//         {/* Buttons */}
//         <Field>
//           <div className="flex gap-x-4 justify-end">
//             <Button variant="outline" onClick={close}>
//               Cancel
//             </Button>
//             <Button type="submit">Create batch</Button>
//           </div>
//         </Field>
//       </FieldGroup>
//     </form>
//   )
// }
