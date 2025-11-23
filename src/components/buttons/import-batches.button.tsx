import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

import ImportBatchesForm from '../forms/import-batches.form'
import Drawer from '../layouts/drawer'
import { Button } from '../ui/button'

export default function ImportBatchesButton() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="text-slate-400 font-normal"
      >
        Import Batches
      </Button>

      <Drawer
        open={open}
        close={close}
        title="Import batches"
        description="Chose xlsx file to import"
      >
        <ImportBatchesForm close={close} />
      </Drawer>
    </>
  )
}
