import { createFileRoute } from '@tanstack/react-router'
import { useShallow } from 'zustand/react/shallow'

import BatchesTable from '@/components/tables/batches.table'
import BatchesToolbar from '@/components/toolbars/batches.toolbar'
import PaginationBar from '@/components/ui-kit/pagination-bar'
import { useFindBatches } from '@/hooks/api/batches/use-find-batches'
import { useBatchesStore } from '@/store/use-batches.store'

export const Route = createFileRoute('/admin/batches')({
  component: RouteComponent,
})

function RouteComponent() {
  // const { data, isPending } = useFindStorageBatches()
  const { data, isPending } = useFindBatches()

  // const { page, limit, setPage } = useBatchesStore()

  const { page, limit, setPage, search, setSearch } = useBatchesStore(
    useShallow((s) => ({
      page: s.page,
      limit: s.limit,
      search: s.search,
      setPage: s.setPage,
      setSearch: s.setSearch,
    })),
  )

  const storageBatches = data?.data || []

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-slate-900 text-3xl font-extrabold leading-8">
          Batches
        </h1>
      </div>

      <p className="mt-2 text-base leading-7 text-slate-500">
        Manage and organize your medical product batches for easy access and
        control.
      </p>

      <div className="mt-6">
        <BatchesToolbar search={search || ''} onSearchChange={setSearch} />
      </div>

      <div className="mt-10 flex flex-col h-full justify-between">
        <BatchesTable batches={storageBatches} isLoading={isPending} />

        <PaginationBar
          page={page}
          limit={limit}
          total={data?.totalElements}
          onPageClick={(page: number) => setPage(page)}
        />
      </div>
    </>
  )
}
