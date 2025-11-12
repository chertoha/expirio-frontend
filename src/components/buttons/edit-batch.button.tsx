import type { Batch } from '@/types/entities';

import { SquarePenIcon } from 'lucide-react';
import { useState } from 'react';

import Drawer from '../layouts/drawer';
import { Button } from '../ui/button';
import EditBatchForm from '../forms/edit-batch.form';


type EditBatchButtonProps = {
  batch: Batch
}

export default function EditBatchButton({ batch }: EditBatchButtonProps) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-slate-500  hover:text-slate-500 hover:bg-accent/10"
        onClick={() => setOpen(true)}
      >
        <SquarePenIcon className="h-4 w-4" />
      </Button>

      <Drawer
        open={open}
        close={close}
        title="Update batch"
        description="Update the details for the batch."
      >
        <EditBatchForm batch={batch} close={close} />
      </Drawer>
    </>
  )
}