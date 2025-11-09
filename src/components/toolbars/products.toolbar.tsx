import { Search } from 'lucide-react'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { useActiveIngredientsStore } from '@/store/use-active-ingredients.store'
import { useCategoryListStore } from '@/store/use-category-list.store'
import { useProductsStore } from '@/store/use-products.store'

import CreateProductButton from '../buttons/create-product.button'
import SearchSelect from '../ui-kit/search-select'

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
    <div className="flex items-center justify-between">
      <div className="w-[300px]">
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

      <div className="flex items-center gap-x-4">
        <SearchSelect
          className="w-[290px]"
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
          className="w-[290px]"
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
      </div>
    </div>
  )
}
