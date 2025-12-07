import { Search, SlidersHorizontal } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGetCategoryList } from '@/hooks/api/categories/use-get-category-list'
import { useFindAllProducts } from '@/hooks/api/products/use-find-products'
import { useListStorages } from '@/hooks/api/storages/use-list-storages'
import { useBatchesStore } from '@/store/use-batches.store'
import { BatchStatus } from '@/types/common'

import BatchesSettingsDropDownButton from '../buttons/batches-settings-dropdown.button'
import CreateBatchButton from '../buttons/create-batch.button'
import ImportBatchesButton from '../buttons/import-batches.button'
import SearchSelect from '../ui-kit/search-select'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'

type BatchesToolbarProps = {
  search: string
  onSearchChange: (value: string) => void
}

export default function BatchesToolbar({
  search,
  onSearchChange,
}: BatchesToolbarProps) {
  const { data: storages = [] } = useListStorages()

  const {
    status,
    setStatus,
    productId,
    setProduct,
    categoryId,
    setCategory,
    storageId,
    setStorage,
  } = useBatchesStore()
  const { data: products = [] } = useFindAllProducts()
  const { categoryList = [] } = useGetCategoryList()

  return (
    <div className="flex max-xs:flex-col justify-between gap-4">
      <div className="w-full max-w-[250px]">
        <InputGroup>
          <InputGroupInput
            placeholder="Search..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="hidden xl:flex items-center gap-x-4 ">
        <Select
          value={status?.toString() || ''}
          onValueChange={(v) =>
            setStatus(v !== 'none' ? (v as BatchStatus) : null)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none" className="italic text-slate-400">
              {status ? 'Clear' : 'Select status'}
            </SelectItem>
            <SelectItem value={BatchStatus.ACTIVE}>Active</SelectItem>
            <SelectItem value={BatchStatus.EXPIRING_SOON}>
              Expiring soon
            </SelectItem>
            <SelectItem value={BatchStatus.EXPIRED}>Expired</SelectItem>
          </SelectContent>
        </Select>

        <SearchSelect
          className="w-[200px]"
          value={productId}
          onChange={(value) => setProduct(Number(value))}
          options={
            products.map(({ id, name }) => ({
              label: name,
              value: id,
            })) || []
          }
          placeholder="Product"
          isNumber
        />

        <SearchSelect
          className="w-[200px]"
          value={categoryId}
          onChange={(value) => setCategory(Number(value))}
          options={
            categoryList.map(({ id, name }) => ({
              label: name,
              value: id,
            })) || []
          }
          placeholder="Category"
          isNumber
        />

        <SearchSelect
          className="w-[200px]"
          value={storageId}
          onChange={(value) => setStorage(Number(value))}
          options={
            storages.map(({ id, name }) => ({
              label: name,
              value: id,
            })) || []
          }
          placeholder="Storage"
          isNumber
        />

        <BatchesSettingsDropDownButton />
      </div>

      <div className="xl:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm w-full max-w-[300px]">
              <SlidersHorizontal size={18} />
              Filters
            </button>
          </SheetTrigger>

          <SheetContent side="bottom" className="p-4">
            <SheetHeader>
              <SheetTitle>Filters & Actions</SheetTitle>
            </SheetHeader>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Select
                value={status?.toString() || ''}
                onValueChange={(v) =>
                  setStatus(v !== 'none' ? (v as BatchStatus) : null)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none" className="italic text-slate-400">
                    {status ? 'Clear' : 'Select status'}
                  </SelectItem>
                  <SelectItem value={BatchStatus.ACTIVE}>Active</SelectItem>
                  <SelectItem value={BatchStatus.EXPIRING_SOON}>
                    Expiring soon
                  </SelectItem>
                  <SelectItem value={BatchStatus.EXPIRED}>Expired</SelectItem>
                </SelectContent>
              </Select>

              <SearchSelect
                className="w-full"
                value={productId}
                onChange={(value) => setProduct(Number(value))}
                options={
                  products.map(({ id, name }) => ({
                    label: name,
                    value: id,
                  })) || []
                }
                placeholder="Product"
                isNumber
              />

              <SearchSelect
                className="w-full"
                value={categoryId}
                onChange={(value) => setCategory(Number(value))}
                options={
                  categoryList.map(({ id, name }) => ({
                    label: name,
                    value: id,
                  })) || []
                }
                placeholder="Category"
                isNumber
              />

              <SearchSelect
                className="w-full"
                value={storageId}
                onChange={(value) => setStorage(Number(value))}
                options={
                  storages.map(({ id, name }) => ({
                    label: name,
                    value: id,
                  })) || []
                }
                placeholder="Storage"
                isNumber
              />
            </div>

            <div className="flex  max-xs:flex-col justify-end gap-4 mt-4">
              <div className="max-w-300px">
                <CreateBatchButton />
              </div>

              <div className=" max-w-300px">
                <ImportBatchesButton />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
