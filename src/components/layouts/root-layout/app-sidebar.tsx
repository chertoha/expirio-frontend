import type { Icon } from '@tabler/icons-react'
import type { LinkProps } from '@tanstack/react-router'

import {
  IconBellPlus,
  IconChartColumn,
  IconDashboard,
  IconHeartPlus,
  IconMapPin,
  IconPackage,
} from '@tabler/icons-react'
import * as React from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar'

import { NavMain } from './nav-main'

export type NavMain = {
  title: string
  url: LinkProps['to']
  icon: Icon
}

const navMain: NavMain[] = [
  {
    title: 'Dashboard',
    url: '/admin/dashboard',
    icon: IconDashboard,
  },
  {
    title: 'Batches',
    url: '/admin/batches',
    icon: IconPackage,
  },
  {
    title: 'Storages',
    url: '/admin/storages',
    icon: IconMapPin,
  },
  {
    title: 'Categories',
    url: '/admin/categories',
    icon: IconChartColumn,
  },
  {
    title: 'Notice',
    url: '/admin/notice',
    icon: IconBellPlus,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <div className="flex items-start gap-x-3">
          <div className="shrink-0 flex items-center justify-center p-2 rounded-sm bg-accent shadow-[inset_6px_3px_19px_0px_#00000040] text-white">
            <IconHeartPlus size={24} className="" />
          </div>
          <div className="">
            <p className="text-xl leading-6 font-semibold text-slate-900">
              xPirio
            </p>
            <p className="text-sm leading-4 tracking-tighter text-slate-500">
              Medication Control Panel
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="text-slate-500 mt-6">
        <NavMain items={navMain} />
      </SidebarContent>

      <SidebarFooter></SidebarFooter>
    </Sidebar>
  )
}
