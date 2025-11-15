import { IconSearch } from '@tabler/icons-react'

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useFindStorage } from '@/hooks/api/batches/use-find-storage'
import { useFindCategories } from '@/hooks/api/categories/use-find-categories'

export default function BatchesSearchbar() {
  const { data: categoriesResponse } = useFindCategories()
  const { data: storages = [] } = useFindStorage()
  return (
    <div className="mb-9 flex items-flex-start justify-between">
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
      {/* Categories */}
      <Select>
        <SelectTrigger id="category">
          <SelectValue placeholder="Categories" />
        </SelectTrigger>
        <SelectContent>
          {categoriesResponse?.data?.map((category) => (
            <SelectItem key={category.id} value={String(category.id)}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Storage */}
      <Select>
        <SelectTrigger id="storage">
          <SelectValue placeholder="Storage" />
        </SelectTrigger>
        <SelectContent>
          {storages.map((storage) => (
            <SelectItem key={storage.id} value={String(storage.id)}>
              {storage.name}
            </SelectItem>
          ))}
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
            className="px-3 py-2.5 text-sm rounded-md hover:bg-[#2DD4BF] hover:text-[#F8FAFC]"
          >
            All
          </SelectItem>
          <SelectItem value="OK">OK</SelectItem>
          <SelectItem value="Expired soon">Expired soon</SelectItem>
          <SelectItem value="Expired">Expired</SelectItem>
        </SelectContent>
      </Select>
      {/* Expired date */}
      <Select>
        <SelectTrigger id="expired date">
          <SelectValue placeholder="Expired date" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="300">300</SelectItem>
          <SelectItem value="500">500</SelectItem>
          <SelectItem value="1000">1000</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
