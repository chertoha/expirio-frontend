import type { ColumnDef, Table as TableType } from '@tanstack/react-table'

import { flexRender } from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx'

interface ITableBaseProps<T> {
  table: TableType<T>
  loading: boolean
  columns: ColumnDef<T>[]
}

const TableBaseBatches = <T,>({
  table,
  loading,
  columns,
}: ITableBaseProps<T>) => {
  return (
    <Table className="bg-white rounded-lg">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                style={{ width: header.getSize() }}
                className="px-4 py-3 text-[#0F172A] text-sm font-medium text-center"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="h-24 text-center flex items-center justify-center"
            >
              Loading...
            </TableCell>
          </TableRow>
        ) : table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
              className="hover:bg-slate-50 even:bg-slate-50/40 transition-colors"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  data-slot="table-cell"
                  className="text-sm text-[#475569] align-middle whitespace-nowrap 
                             px-4 py-3 text-center border-t border-slate-100"
                >
                  <div className="flex items-center justify-center gap-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="h-24 text-center text-slate-500"
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default TableBaseBatches
