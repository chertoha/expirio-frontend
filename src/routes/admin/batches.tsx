import { IconCalendarMonth, IconChartDots2, IconDots, IconMapPin, IconPackage, IconPencilMinus, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import { format } from 'date-fns';
import * as React from 'react';
import { useState } from 'react';



import Drawer from '@/components/layouts/drawer';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MainTitle } from '@/components/ui/main-title';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';





export const Route = createFileRoute('/admin/batches')({
  component: RouteComponent,
})

const batchCategories = [
  {
    batchNumber: 'ASP-2024-112',
    description: 'Pain Relief',
    manufactureDate: '2025-10-07T00:00:00.000Z',
    expirationDate: '2026-10-07T00:00:00.000Z',
    productId: 2,

    name: 'Aspirin 325mg',
    dosage: 300,
    category: 'Refrigerated medicines',
    location: 'Refrigerator unit 1',
  },
  {
    batchNumber: 'ASP-2024-113',
    description: 'Pain Relief',
    manufactureDate: '2025-10-07T00:00:00.000Z',
    expirationDate: '2026-10-07T00:00:00.000Z',
    productId: 3,

    name: 'Aspirin 325mg',
    dosage: 300,
    category: 'Refrigerated medicines',
    location: 'Refrigerator unit 1',
  },
]
// {
//   "name": "Aspirin Plus",
//   "barcode": "987654321",
//   "dosage": 500,
//   "dosageUnitId": 1,
//   "activeIngredientId": 1
// }
function RouteComponent() {
  const [open, setOpen] = useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [formData, setFormData] = useState({
    batchNumber: '',
    quantity: '',
    expirationDate: undefined as Date | undefined,
    location: '',
    category: '',
    description: '',
  })
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }
  const handleDateChange = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate)
      setFormData((prev) => ({ ...prev, expirationDate: selectedDate }))
      setCalendarOpen(false) // ✅ закриваємо календар після вибору дати
    }
  }
  const handleAddBatch = () => {
    if (
      !formData.batchNumber ||
      !formData.quantity ||
      !formData.expirationDate ||
      !formData.location ||
      !formData.category ||
      !formData.description
    ) {
      alert('Please fill in all fields.')
    } else {
      console.log('Form data:', formData)
      setOpen(false)
    }
  }
  return (
    <>
      <div className="flex items-flex-start justify-between mb-8.5">
        <MainTitle
          title={'Batches inventory'}
          text={
            'Organize and classify your medical supplies for easier tracking and reporting'
          }
        />
        <Button onClick={() => setOpen(true)}>
          <IconPlus />
          Add batch
        </Button>
      </div>
      <div className="flex items-flex-start justify-between">
        <div className="relative w-[180px]">
          {/* Іконка ліворуч всередині input */}
          <IconSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />

          <Input
            type="search"
            placeholder="Search batches"
            className="pl-8 text-left border-[#2DD4BF] shadow-none hover:ring-0 focus-visible:ring-0 focus-visible:border-[#2DD4BF]"
          />
        </div>
        {/* Quantity */}
        <Select>
          <SelectTrigger id="Quantity">
            <SelectValue placeholder="Quantity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="300">300</SelectItem>
            <SelectItem value="500">500</SelectItem>
            <SelectItem value="1000">1000</SelectItem>
          </SelectContent>
        </Select>
        {/* Categories */}
        <Select>
          <SelectTrigger id="category">
            <SelectValue placeholder="Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Refrigerated medicines">
              Refrigerated medicines
            </SelectItem>
            <SelectItem value="Vaccines">Vaccines</SelectItem>
            <SelectItem value="Diagnostic kits">Diagnostic kits</SelectItem>
          </SelectContent>
        </Select>

        {/* Locations */}
        <Select>
          <SelectTrigger id="Location">
            <SelectValue placeholder="Locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Refrigerator unit 1">
              Refrigerator unit 1
            </SelectItem>
            <SelectItem value="Emergency kit">Emergency kit</SelectItem>
            <SelectItem value="Cabinet A - Room 101">
              Cabinet A - Room 101
            </SelectItem>
          </SelectContent>
        </Select>
        {/* Registration date */}
        <Select>
          <SelectTrigger id="Registration date">
            <SelectValue placeholder="Registration date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="From">From</SelectItem>
            <SelectItem value="To">To</SelectItem>
          </SelectContent>
        </Select>

        {/* Expiration status */}
        <Select>
          <SelectTrigger id="Expiration status">
            <SelectValue placeholder="Expiration status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value="All"
              className="px-[12px] py-[10px] text-sm rounded-md hover:bg-[#2DD4BF] hover:text-[#F8FAFC]"
            >
              All
            </SelectItem>
            <SelectItem value="OK">OK</SelectItem>
            <SelectItem value="Expired soon">Expired soon</SelectItem>
            <SelectItem value="Expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ul>
        {batchCategories.map((batch) => (
          <li
            key={batch.batchNumber}
            className="p-[22px_20px] flex items-center justify-between mt-8 mb-4 font-medium text-base text-[#64748B] border-[#16A34A] rounded-md border-l-4 border-r-4 border"
          >
            <div className="flex flex-col gap-[6px]">
              <h4 className="text-xl text-[#0F172A]">{batch.name}</h4>
              <p>Batch: {batch.batchNumber}</p>
              <p>{batch.description}</p>
            </div>
            <div className="flex items-center justify-between gap-[12px]">
              <IconPackage />
              <p>{batch.dosage}</p>
              <IconDots />
            </div>
            <div className="flex items-center justify-between gap-[12px] truncate">
              <IconChartDots2 />
              <p className="truncate w-40">{batch.category}</p>
            </div>
            <div className="flex items-center justify-between gap-[12px] w-[140px] truncate">
              <IconMapPin />
              <p className="truncate w-40">{batch.location}</p>
            </div>
            <div className="flex items-center justify-between gap-[12px] fill-red-50">
              <IconCalendarMonth />
              <p>
                {new Date(batch.expirationDate).toLocaleDateString('uk-UA')}
              </p>
            </div>
            <div>
              <button className="border border-[#2DD4BF] px-3 py-1 rounded-md">
                Active
              </button>
            </div>
            <div className="flex items-center justify-between gap-[24px]">
              <IconPencilMinus />
              <IconTrash />
            </div>
          </li>
        ))}
      </ul>

      <Drawer
        open={open}
        close={() => setOpen(false)}
        title="Add new batch"
        description="Enter the details for the new batch"
      >
        <div className="flex flex-col gap-[16px]">
          <div className="grid grid-cols-2 gap-[28px]">
            {/* Batch number */}
            <div className="w-full">
              <Label htmlFor="Batch number" className="mb-1.5">
                {/* <MailIcon className="w-4 h-4 mr-1" /> */}
                Batch number
              </Label>
              <Input
                name="batchNumber"
                type="search"
                placeholder="Enter batch number"
                className=""
                value={formData.batchNumber}
                onChange={handleChange}
              />
            </div>
            {/* Quantity */}
            <div className="w-full">
              <Label htmlFor="Quantity" className="mb-1.5">
                Quantity
              </Label>
              <Select
                onValueChange={(value) => handleSelectChange('quantity', value)}
              >
                <SelectTrigger id="quantity" className="w-full">
                  <SelectValue placeholder="Quantity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="300">300</SelectItem>
                  <SelectItem value="500">500</SelectItem>
                  <SelectItem value="1000">1000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[28px]">
            {/* Expiration date */}
            <div className="w-full">
              <Label htmlFor="Expiration Date" className="mb-1.5">
                Expiration Date
              </Label>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild className="w-full">
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-between text-left font-normal',
                      !date && 'text-muted-foreground',
                    )}
                  >
                    {date ? (
                      format(date, 'PPP')
                    ) : (
                      <span>Pick expiration date</span>
                    )}
                    <IconCalendarMonth className="mr-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date || undefined}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Storage location */}
            <div>
              <Label htmlFor="Storage location" className="mb-1.5">
                Storage location
              </Label>
              <Select
                onValueChange={(value) => handleSelectChange('location', value)}
              >
                <SelectTrigger id="location" className="w-full">
                  <SelectValue placeholder="Select storage location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="All"
                    className="px-[12px] py-[10px] text-sm rounded-md hover:bg-[#2DD4BF] hover:text-[#F8FAFC]"
                  >
                    All
                  </SelectItem>
                  <SelectItem value="Refrigerator unit 1">
                    Refrigerator unit 1
                  </SelectItem>
                  <SelectItem value="Emergency kit">Emergency kit</SelectItem>
                  <SelectItem value="Cabinet A - Room 101">
                    Cabinet A - Room 101
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="Category" className="mb-1.5">
              Category
            </Label>
            <Select
              onValueChange={(value) => handleSelectChange('category', value)}
            >
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Refrigerated medicines">
                  Refrigerated medicines
                </SelectItem>
                <SelectItem value="Vaccines">Vaccines</SelectItem>
                <SelectItem value="Diagnostic kits">Diagnostic kits</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="Description" className="mb-1.5">
              {/* <MailIcon className="w-4 h-4 mr-1" /> */}
              Description
            </Label>
            <textarea
              onChange={handleChange}
              id="description"
              name="description"
              value={formData.description}
              placeholder="Brief description of the batch number "
              className="w-full border rounded-md p-2 text-sm outline-none focus:border-[#2DD4BF] focus:ring-0"
            />
          </div>
        </div>
        <div className="flex justify-end gap-[20px] mt-4">
          <Button
            // variant="outline"
            // className={cn(
            //   'w-full justify-start justify-between text-left font-normal',
            //   !date && 'text-muted-foreground',
            // )}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleAddBatch}>Add batch</Button>
        </div>
      </Drawer>
    </>
  )
}