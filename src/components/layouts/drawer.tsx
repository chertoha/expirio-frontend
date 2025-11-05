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
      <SheetContent className="min-w-[600px] p-6">
        <SheetHeader className="px-0 pt-0">
          <SheetTitle className="text-2xl leading-8">{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="pt-2">{children}</div>
      </SheetContent>
    </Sheet>
  )
}
