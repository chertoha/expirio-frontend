import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

import AddAlertForm from '../forms/add-alert.form'
import Drawer from '../layouts/drawer'
import { Button } from '../ui/button'

export default function AddAlertButton() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <PlusIcon />
        Add Alert
      </Button>

      <Drawer
        open={open}
        close={close}
        title="Add new alert"
        description="Enter the details for the new alert."
      >
        <AddAlertForm close={close} />
      </Drawer>
    </>
  )
}
