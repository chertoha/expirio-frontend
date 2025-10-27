import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import Drawer from '@/components/layouts/drawer'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/admin/batches')({
  component: RouteComponent,
})

function RouteComponent() {
  const [open, setOpen] = useState(false)

  return (
    <>
      Hello "/batches"!
      <Button onClick={() => setOpen(true)}>Click</Button>
      <Drawer
        open={open}
        close={() => setOpen(false)}
        title="Lorem ipsum dolor sit amet"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore sequi
        excepturi ut deleniti soluta tempore"
      >
        . Labore sequi
      </Drawer>
    </>
  )
}
