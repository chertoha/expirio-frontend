import { Search, SlidersHorizontal } from 'lucide-react'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { useActiveIngredientsStore } from '@/store/use-active-ingredients.store'
import { useCategoryListStore } from '@/store/use-category-list.store'
import { useProductsStore } from '@/store/use-products.store'

import AssignCategoryButton from '../buttons/assign-category.button'
import CreateProductButton from '../buttons/create-product.button'
import SearchSelect from '../ui-kit/search-select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'

type ProductsToolbarProps = {
  search: string
  onSearchChange: (value: string) => void
}

export default function ProductsToolbar({
  search,
  onSearchChange,
}: ProductsToolbarProps) {
  const { ingredients } = useActiveIngredientsStore()
  const { categoryList } = useCategoryListStore()
  const { categoryId, activeIngredientId, setCategory, setIngredient } =
    useProductsStore()

  return (
    <div className="flex max-xs:flex-col justify-between gap-4">
      <div className="w-full max-w-[300px]">
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
        <SearchSelect
          className="w-[200px]"
          value={categoryId}
          onChange={(value) => setCategory(Number(value))}
          options={categoryList.map(({ id, name }) => ({
            label: name,
            value: id,
          }))}
          placeholder="Category..."
          isNumber
        />

        <SearchSelect
          className="w-[200px]"
          value={activeIngredientId}
          onChange={(value) => setIngredient(Number(value))}
          options={ingredients.map(({ id, name }) => ({
            label: name,
            value: id,
          }))}
          placeholder="Active ingredient..."
          isNumber
        />

        <CreateProductButton />
        <AssignCategoryButton />
      </div>

      <div className="xl:hidden ">
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

            <div className="grid max-sm:grid-cols-1 grid-cols-2 gap-4">
              <SearchSelect
                className="w-full"
                value={categoryId}
                onChange={(value) => setCategory(Number(value))}
                options={categoryList.map(({ id, name }) => ({
                  label: name,
                  value: id,
                }))}
                placeholder="Category..."
              />

              <SearchSelect
                className="w-full"
                value={activeIngredientId}
                onChange={(value) => setIngredient(Number(value))}
                options={ingredients.map(({ id, name }) => ({
                  label: name,
                  value: id,
                }))}
                placeholder="Active ingredient..."
              />
            </div>

            <div className="flex max-xs:flex-col justify-end gap-4 mt-4">
              <CreateProductButton />
              <AssignCategoryButton />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
