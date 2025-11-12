import { PlusIcon } from 'lucide-react';
import { useState } from 'react';



import CreateBatchForm from '../forms/create-batch.form';
import Drawer from '../layouts/drawer';
import { Button } from '../ui/button';


export default function CreateBatchButton() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <PlusIcon />
        Add batch
      </Button>

      <Drawer
        open={open}
        close={close}
        title="Add new Batch"
        description="Enter the details for the new batch."
      >
        <CreateBatchForm close={close} />
      </Drawer>
    </>
  )
}