import { IconArrowsTransferDown } from '@tabler/icons-react'
import { useState } from 'react'

import RelocateBatchForm from '../forms/relocate-batch.form'
import Drawer from '../layouts/drawer'
import { Button } from '../ui/button'

type RelocateBatchButtonProps = {
  batchId: number
  currentStorageId: number
  qtyLeft: number
}

export default function RelocateBatchButton({
  batchId,
  currentStorageId,
  qtyLeft,
}: RelocateBatchButtonProps) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-success  hover:text-slate-500 hover:bg-accent/10"
        onClick={() => setOpen(true)}
      >
        <IconArrowsTransferDown className="h-4 w-4" />
      </Button>

      <Drawer
        open={open}
        close={close}
        title="Relocate batch"
        description="Set relocation data"
      >
        <RelocateBatchForm
          close={close}
          batchId={batchId}
          currentStorageId={currentStorageId}
          qtyLeft={qtyLeft}
        />
      </Drawer>
    </>
  )
}
