import type { CreateBatchBackendDTO } from '@/types/entities'

import { format } from 'date-fns'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { useFindCategories } from '@/hooks/api/use-find-categories'
import { useFindProducts } from '@/hooks/api/use-find-products' // 👈 додай цей хук, якщо його ще нема
import { useFindStorage } from '@/hooks/api/use-find-storage'
import { cn } from '@/lib/utils'

type Props = {
  onSubmit: (data: CreateBatchBackendDTO) => void
  close: () => void
}

export default function CreateBatchForm({ onSubmit, close }: Props) {
  const { data: categoriesResponse } = useFindCategories()
  const { data: storages = [] } = useFindStorage()
  const { data: products = [] } = useFindProducts()

  const [formData, setFormData] = useState({
    batchNumber: '',
    description: '',
    expirationDate: null as Date | null,
    productId: undefined as number | undefined,
    quantity: undefined as number | undefined,
    storageId: undefined as number | undefined,
    categoryId: undefined as number | undefined,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNumberChange = (name: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: Number(value) }))
  }

  const handleSubmit = () => {
    if (
      !formData.batchNumber ||
      !formData.expirationDate ||
      !formData.productId
    ) {
      alert('Please fill all required fields')
      return
    }

    // ✅ бекенд приймає тільки ці поля
    const payload: CreateBatchBackendDTO = {
      batchNumber: formData.batchNumber,
      description: formData.description,
      manufactureDate: new Date().toISOString(),
      expirationDate: formData.expirationDate.toISOString(),
      productId: formData.productId,
    }

    console.log('📦 Sending payload:', payload)
    onSubmit(payload)
    close()
  }

  return (
    <div className="flex flex-col gap-4 p-2">
      {/* Batch number */}
      <div>
        <Label>Batch number *</Label>
        <Input
          name="batchNumber"
          placeholder="e.g. BATCH-001"
          value={formData.batchNumber}
          onChange={handleChange}
        />
      </div>

      {/* Description */}
      <div>
        <Label>Description</Label>
        <textarea
          name="description"
          placeholder="Add a short description..."
          className="w-full border rounded-md p-2 min-h-[80px]"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      {/* Product */}
      <div>
        <Label>Product *</Label>
        <Select onValueChange={(val) => handleNumberChange('productId', val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select product" />
          </SelectTrigger>
          <SelectContent>
            {products?.map((p) => (
              <SelectItem key={p.id} value={String(p.id)}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Category (не відправляється, лише для вибору) */}
      <div>
        <Label>Category</Label>
        <Select onValueChange={(val) => handleNumberChange('categoryId', val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categoriesResponse?.data?.map((c) => (
              <SelectItem key={c.id} value={String(c.id)}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Storage (не відправляється) */}
      <div>
        <Label>Storage</Label>
        <Select onValueChange={(val) => handleNumberChange('storageId', val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select storage" />
          </SelectTrigger>
          <SelectContent>
            {storages?.map((s) => (
              <SelectItem key={s.id} value={String(s.id)}>
                {s.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Quantity (не відправляється) */}
      <div>
        <Label>Quantity</Label>
        <Select onValueChange={(val) => handleNumberChange('quantity', val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select quantity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="100">100</SelectItem>
            <SelectItem value="300">300</SelectItem>
            <SelectItem value="500">500</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Expiration Date */}
      <div>
        <Label>Expiration Date *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn('w-full text-left font-normal')}
            >
              {formData.expirationDate
                ? format(formData.expirationDate, 'PPP')
                : 'Pick expiration date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="p-0">
            <Calendar
              mode="single"
              selected={formData.expirationDate || undefined}
              onSelect={(date) =>
                setFormData((prev) => ({
                  ...prev,
                  expirationDate: date || null,
                }))
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={close}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Create batch</Button>
      </div>
    </div>
  )
}

// import type { CreateBatchBackendDTO } from '@/types/entities';
// import { IconCalendarMonth } from '@tabler/icons-react';
// import { format } from 'date-fns';
// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Calendar } from '@/components/ui/calendar';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { cn } from '@/lib/utils';

// type CreateBatchFormProps = {
//   close: () => void
//   batch?: Partial<CreateBatchBackendDTO>
//   onSubmit: (batch: CreateBatchBackendDTO) => void
// }

// export default function CreateBatchForm({ batch, onSubmit, close }: CreateBatchFormProps) {
//   const [calendarOpen, setCalendarOpen] = useState(false);
//   const [manufactureDate, setManufactureDate] = useState<Date | undefined>(
//     batch?.manufactureDate ? new Date(batch.manufactureDate) : new Date()
//   );
//   const [expirationDate, setExpirationDate] = useState<Date | undefined>(
//     batch?.expirationDate ? new Date(batch.expirationDate) : new Date()
//   );
//   const [batchNumber, setBatchNumber] = useState(batch?.batchNumber || '');
//   const [description, setDescription] = useState(batch?.description || '');
//   const [productId, setProductId] = useState(batch?.productId || 0); // вибір продукту

//   const handleSubmit = () => {
//     if (!batchNumber || !manufactureDate || !expirationDate || !productId) {
//       alert('Please fill in all required fields.');
//       return;
//     }

//     onSubmit({
//       batchNumber,
//       description,
//       manufactureDate: manufactureDate.toISOString(),
//       expirationDate: expirationDate.toISOString(),
//       productId
//     });

//     close();
//   }

//   return (
//     <div className="flex flex-col gap-4">
//       {/* Batch Number */}
//       <div>
//         <Label>Batch Number</Label>
//         <Input
//           placeholder="Enter batch number"
//           value={batchNumber}
//           onChange={(e) => setBatchNumber(e.target.value)}
//         />
//       </div>

//       {/* Manufacture Date */}
//       <div>
//         <Label>Manufacture Date</Label>
//         <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
//           <PopoverTrigger asChild>
//             <Button className={cn(!manufactureDate && 'text-muted-foreground')}>
//               {manufactureDate ? format(manufactureDate, 'PPP') : 'Pick date'}
//               <IconCalendarMonth className="ml-2 h-4 w-4" />
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent>
//             <Calendar
//               mode="single"
//               selected={manufactureDate}
//               onSelect={(date) => date && setManufactureDate(date)}
//             />
//           </PopoverContent>
//         </Popover>
//       </div>

//       {/* Expiration Date */}
//       <div>
//         <Label>Expiration Date</Label>
//         <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
//           <PopoverTrigger asChild>
//             <Button className={cn(!expirationDate && 'text-muted-foreground')}>
//               {expirationDate ? format(expirationDate, 'PPP') : 'Pick date'}
//               <IconCalendarMonth className="ml-2 h-4 w-4" />
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent>
//             <Calendar
//               mode="single"
//               selected={expirationDate}
//               onSelect={(date) => date && setExpirationDate(date)}
//             />
//           </PopoverContent>
//         </Popover>
//       </div>

//       {/* Product selection */}
//       <div>
//         <Label>Product ID</Label>
//         <Input
//           type="number"
//           placeholder="Enter product ID"
//           value={productId || ''}
//           onChange={(e) => setProductId(Number(e.target.value))}
//         />
//       </div>

//       {/* Description */}
//       <div>
//         <Label>Description</Label>
//         <textarea
//           placeholder="Optional description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full border rounded-md p-2 text-sm outline-none focus:border-[#2DD4BF]"
//         />
//       </div>

//       {/* Buttons */}
//       <div className="flex justify-end gap-5 mt-4">
//         <Button onClick={close}>Cancel</Button>
//         <Button onClick={handleSubmit}>Save Batch</Button>
//       </div>
//     </div>
//   );
// }
