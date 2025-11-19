import { createFileRoute } from '@tanstack/react-router'

import CreateBatchButton from '@/components/buttons/create-batch.button'
import BatchesTable from '@/components/tables/batches.table'
import BatchesToolbar from '@/components/toolbars/batches.toolbar'
import PaginationBar from '@/components/ui-kit/pagination-bar'
import { MainTitle } from '@/components/ui/main-title'
import { useFindStorageBatches } from '@/hooks/api/batches/use-find-storage-batch'
import { useStorageBatchesStore } from '@/store/use-storage-batch.store'

export const Route = createFileRoute('/admin/batches')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isPending } = useFindStorageBatches()
  const { page, limit, setPage } = useStorageBatchesStore()

  // const batches = Array.isArray(batchesResponse?.data)
  //   ? batchesResponse.data
  //   : []

  const storageBatches = data?.data || []

  return (
    <>
      <div className="flex justify-between mb-8">
        <MainTitle
          title="Batches inventory"
          text="Organize and track your supplies"
        />
        <CreateBatchButton />
      </div>

      <BatchesToolbar />

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
