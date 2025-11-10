import { IconPlus } from '@tabler/icons-react'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import CreateBatchForm from '@/components/forms/create-batch.form'
import Drawer from '@/components/layouts/drawer'
import BatchesTable from '@/components/tables/batches.table'
import BatchesSearchbar from '@/components/toolbars/batches.seachbar'
import { Button } from '@/components/ui/button'
import { MainTitle } from '@/components/ui/main-title'
import { useCreateBatch } from '@/hooks/api/use-create-batch'
import { useFindBatches } from '@/hooks/api/use-find-batches'

export const Route = createFileRoute('/admin/batches')({
  component: RouteComponent,
})

function RouteComponent() {
  const [open, setOpen] = useState(false)
  const { mutate: createBatch } = useCreateBatch()
  const { data: batches = [] } = useFindBatches()

  const handleSubmit = (data: any) => {
    createBatch(data)
    setOpen(false)
  }

  return (
    <>
      <div className="flex justify-between mb-8">
        <MainTitle
          title="Batches inventory"
          text="Organize and track your supplies"
        />
        <Button onClick={() => setOpen(true)}>
          <IconPlus /> Add batch
        </Button>
      </div>

      <BatchesSearchbar />
      <BatchesTable batches={batches} onEdit={() => {}} />

      <Drawer open={open} close={() => setOpen(false)} title="Add new batch">
        <CreateBatchForm onSubmit={handleSubmit} close={() => setOpen(false)} />
      </Drawer>
    </>
  )
}
