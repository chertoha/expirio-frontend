import type { Category } from '@/types/entities'
import type { ColumnDef } from '@tanstack/react-table'

import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useCallback, useMemo } from 'react'

import { useDeleteCategory } from '@/hooks/api/categories/use-delete-category'
import { notify } from '@/lib/notify'
import { useCategoriesStore } from '@/store/use-categories.store'

import EditCategoryButton from '../buttons/edit-category.button'
import DeleteIconButton from '../ui-kit/delete-icon.button'
import TableHeaderSortButton from '../ui-kit/table-header-sort.button'
import { Checkbox } from '../ui/checkbox'
import TableBase from './base.table'

type CategoriesTableProps = {
  categories: Category[]
  isLoading?: boolean
}

export default function CategoriesTable({
  categories,
  isLoading = false,
}: CategoriesTableProps) {
  const { sort, setSort } = useCategoriesStore()
  const { mutateAsync: deleteCategory } = useDeleteCategory()

  const handleDelete = useCallback(
    async (id: number) => {
      try {
        await deleteCategory(id)
      } catch {
        notify.error('Something went wrong')
      }
    },
    [deleteCategory],
  )

  const columns = useMemo<ColumnDef<Category>[]>(
    () => [
      {
        accessorKey: 'name',
        header: () => (
          <div className="max-w-[300px]">
            <TableHeaderSortButton
              label="Name"
              sortField="name"
              currentSort={sort}
              setSort={setSort}
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="inline-flex items-center gap-2">
            <span className="font-medium">{row.original.name}</span>
          </div>
        ),

        size: 200,
      },
      {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => (
          <p className="text-gray-600">{row.original.description}</p>
        ),
      },
      {
        id: 'actions',
        header: () => <div className="text-right pr-4">Actions</div>,
        cell: ({ row }) => (
          <div className="flex justify-end gap-2">
            <EditCategoryButton category={row.original} />

            <DeleteIconButton
              onDelete={() => handleDelete(row.original.id)}
              popupTitle="Are you sure you want to delete category"
              popupDescription="This action cannot be undone and will permanently delete category from data base"
            />
          </div>
        ),
      },
    ],
    [handleDelete, setSort, sort],
  )

  const table = useReactTable({
    data: categories,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
  })

  return <TableBase table={table} loading={isLoading} columns={columns} />
}
