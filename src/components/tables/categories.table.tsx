import type { Category } from '@/types/entities'
import type { ColumnDef } from '@tanstack/react-table'

import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useMemo, useState } from 'react'

import { mockCategories } from '@/utils/mocks/categories'

import EditCategoryButton from '../buttons/edit-category.button'
import DeleteIconButton from '../ui-kit/delete-icon.button'
import { Checkbox } from '../ui/checkbox'
import TableBase from './base.table'

export default function CategoriesTable() {
  //   const [data, setData] = useState<Category[]>(mockCategories)
  const [loading] = useState(false)

  const columns = useMemo<ColumnDef<Category>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        size: 40,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span className="font-medium">{row.original.name}</span>
          </div>
        ),
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
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex gap-2">
            <EditCategoryButton id={row.original.id} />

            <DeleteIconButton
              onDelete={() =>
                console.log('delete category id: ', row.original.id)
              }
              popupTitle="Are you sure you want to delete category"
              popupDescription="This action cannot be undone and will permanently delete category from data base"
            />
          </div>
        ),
      },
    ],
    [],
  )

  const table = useReactTable({
    data: mockCategories,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
  })

  return <TableBase table={table} loading={loading} columns={columns} />
}
