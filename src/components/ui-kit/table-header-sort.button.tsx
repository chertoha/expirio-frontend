import { ArrowDown, ArrowUp } from 'lucide-react'

import { cn } from '@/lib/utils'

type TableHeaderSortButtonProps = {
  label: string
  sortField: string
  currentSort?: string
  setSort: (sort: string) => void
}

export default function TableHeaderSortButton({
  label,
  sortField,
  currentSort,
  setSort,
}: TableHeaderSortButtonProps) {
  const [field, order] = currentSort ? currentSort.split(':') : [null, null]
  const isActive = field === sortField
  const direction = isActive ? (order as 'asc' | 'desc') : undefined

  const handleToggle = () => {
    if (!isActive) {
      setSort(`${sortField}:asc`)
    } else if (direction === 'asc') {
      setSort(`${sortField}:desc`)
    } else {
      setSort('id:asc')
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900 transition-colors"
    >
      {label}
      <div className="flex flex-col items-center">
        <ArrowUp
          className={cn(
            'h-2.5 w-2.5',
            direction !== 'desc' ? 'opacity-100' : 'opacity-0',
          )}
        />
        <ArrowDown
          className={cn(
            'h-2.5 w-2.5',
            direction !== 'asc' ? 'opacity-100' : 'opacity-0',
          )}
        />
      </div>
    </button>
  )
}
