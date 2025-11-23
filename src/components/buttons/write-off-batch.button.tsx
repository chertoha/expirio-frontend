import { IconExposureMinus1 } from '@tabler/icons-react'
import { useState } from 'react'

import WriteOffBatchForm from '../forms/write-off-batch.form'
import Drawer from '../layouts/drawer'
import { Button } from '../ui/button'

type WriteOffBatchButtonProps = {
  batchId: number
  storageId: number
  qtyLeft: number
}

export default function WriteOffBatchButton({
  batchId,
  storageId,
  qtyLeft,
}: WriteOffBatchButtonProps) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-warning  hover:text-slate-500 hover:bg-accent/10"
        onClick={() => setOpen(true)}
      >
        <IconExposureMinus1 className="h-4 w-4" />
      </Button>

      <Drawer
        open={open}
        close={close}
        title="Write-off batch"
        description="Specify quantity to write-off"
      >
        <WriteOffBatchForm
          close={close}
          batchId={batchId}
          storageId={storageId}
          qtyLeft={qtyLeft}
        />
      </Drawer>
    </>
  )
}
