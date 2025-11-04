import { Search } from 'lucide-react'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'

import CreateCategoryButton from '../buttons/create-category.button'

type CategoriesToolbarProps = {
  search: string
  onSearchChange: (value: string) => void
}

export default function CategoriesToolbar({
  search,
  onSearchChange,
}: CategoriesToolbarProps) {
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
      <CreateCategoryButton />
    </div>
  )
}
