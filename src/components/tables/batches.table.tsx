import type { Batch } from '@/types/entities';
import type { ColumnDef } from '@tanstack/react-table';



import { IconCalendarMonth, IconChartDots2, IconDots, IconMapPin, IconPackage } from '@tabler/icons-react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';



import { useDeleteBatch } from '@/hooks/api/use-delete-batch';
import { notify } from '@/lib/notify';



import EditBatchButton from '../buttons/edit-batch.button';
import DeleteIconButton from '../ui-kit/delete-icon.button';
import TableBaseBatches from './base.table.batches';


type BatchesTableProps = {
  batches: Batch[]
  onEdit: (batch: Batch) => void
  isLoading?: boolean
}
export default function BatchesTable({
  batches,
  onEdit,
  //   isLoading = false,
}: BatchesTableProps) {
  // const { sort, setSort } = useBatchesStore()
  const { mutateAsync: deleteBatch } = useDeleteBatch()



  const columns = useMemo<ColumnDef<Batch>[]>(
    () => [
      //   {
      //     id: 'select',
      //     header: ({ table }) => (
      //       <Checkbox
      //         checked={
      //           table.getIsAllPageRowsSelected() ||
      //           (table.getIsSomePageRowsSelected() && 'indeterminate')
      //         }
      //         onCheckedChange={(value) =>
      //           table.toggleAllPageRowsSelected(!!value)
      //         }
      //         aria-label="Select all"
      //       />
      //     ),
      //     cell: ({ row }) => (
      //       <Checkbox
      //         checked={row.getIsSelected()}
      //         onCheckedChange={(value) => row.toggleSelected(!!value)}
      //         aria-label="Select row"
      //       />
      //     ),
      //     size: 40,
      //   },
      {
        accessorKey: 'batchNumber',
        header: () => (
          <div className="max-w-[300px]">
            {/* <TableHeaderSortButton
              label="Name"
              sortField="name"
              currentSort={sort}
              setSort={setSort}
            /> */}
            info
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex flex-col items-start gap-1.5">
            <div className="font-[Inter] text-xl text-[#0F172A] font-semibold">
              {row.original.product.name}
            </div>

            <div className="font-[Inter] text-base text-[#64748B] font-normal">
              Batch:{row.original.batchNumber}
            </div>
            <div className="font-[Inter] text-base text-[#64748B] font-normal">
              {row.original.description}
            </div>
          </div>
        ),

        size: 200,
      },
      {
        accessorKey: 'quantity',
        header: 'quantity',
        cell: ({ row }) => {
          const quantitys = row.original.storages || []
          const quantity = quantitys.map((s) => s.temperature).join(', ')
          return (
            <div className="w-[106px] flex items-center gap-2 justify-between text-[#64748B]">
              <IconPackage />
              <div className="font-[Inter] text-base text-[#64748B] font-normal truncate">
                {quantity || '—'}
              </div>
              <IconDots />
            </div>
          )
        },
      },
      {
        accessorKey: 'categories',
        header: 'Categories',
        cell: ({ row }) => {
          const categories = row.original.product?.categories || []
          const categoryNames = categories.map((c) => c.name).join(', ')
          return (
            <div className="flex items-center gap-2 text-[#64748B]">
              <IconChartDots2 />
              <div className="truncate w-[120px]">{categoryNames || '—'}</div>
            </div>
          )
        },
      },
      {
        accessorKey: 'storages',
        header: 'Storages',
        cell: ({ row }) => {
          const storages = row.original.storages || []
          const storageNames = storages.map((s) => s.name).join(', ')
          return (
            <div className="flex items-center gap-2 text-[#64748B]">
              <IconMapPin />
              <div className="truncate w-[120px]">{storageNames || '—'}</div>
            </div>
          )
        },
      },
      {
        accessorKey: 'expirationDate',
        header: 'Expiration Date',
        cell: ({ row }) => (
          <div className="w-[110px] flex items-center gap-3 text-[#64748B]">
            <IconCalendarMonth />
            <p>
              {new Date(row.original.expirationDate).toLocaleDateString(
                'uk-UA',
              )}
            </p>
          </div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({}) => (
          <div className="">
            <button className="w-[114px] border border-[#2DD4BF] px-3 py-1 rounded-md">
              Active
            </button>
          </div>
        ),
      },
      {
        id: 'actions',
        header: () => <div className="text-right pr-4">Actions</div>,
        cell: ({ row }) => (
          <div className="flex justify-end gap-2">
            {/* <EditBatchButton onClick={() => onEdit(row.original)} /> */}
            {/* <EditBatchButton /> */}

            <DeleteIconButton
              onDelete={() => deleteBatch(row.original.id)}
              popupTitle="Are you sure you want to delete category"
              popupDescription="This action cannot be undone and will permanently delete category from data base"
            />
          </div>
        ),
      },
    ],
    [onEdit, deleteBatch],
  )

  const table = useReactTable({
    data: batches,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
  })

  return <TableBaseBatches table={table} loading={false} columns={columns} />
}