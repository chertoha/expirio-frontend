import { createFileRoute } from '@tanstack/react-router'

import CreateBatchButton from '@/components/buttons/create-batch.button'
import BatchesTable from '@/components/tables/batches.table'
import BatchesSearchbar from '@/components/toolbars/batches.seachbar'
import { MainTitle } from '@/components/ui/main-title'
import { useFindBatches } from '@/hooks/api/batches/use-find-batches'

export const Route = createFileRoute('/admin/batches')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: batchesResponse, isPending } = useFindBatches()

  const batches = Array.isArray(batchesResponse?.data)
    ? batchesResponse.data
    : []

  return (
    <>
      <div className="flex justify-between mb-8">
        <MainTitle
          title="Batches inventory"
          text="Organize and track your supplies"
        />
        <CreateBatchButton />
      </div>

      <BatchesSearchbar />
      <BatchesTable batches={batches} isLoading={isPending} />
    </>
  )
}
