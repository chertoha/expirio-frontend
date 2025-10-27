import type { PropsWithChildren } from 'react'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

type DrawerProps = PropsWithChildren<{
  open: boolean
  close: () => void
  title: string
  description?: string
}>

export default function Drawer({
  children,
  open,
  close,
  title,
  description,
}: DrawerProps) {
  return (
    <Sheet open={open} onOpenChange={close}>
      {/* <SheetTrigger>Open</SheetTrigger> */}
      <SheetContent className="min-w-[600px]">
        <SheetHeader>
          <SheetTitle className="text-2xl leading-8">{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>

          <div className="pt-4">{children}</div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
