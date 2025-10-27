import {
  createFileRoute,
  Outlet,
  redirect,
  useRouter,
  useRouterState,
} from '@tanstack/react-router'
import { useEffect } from 'react'

import { AppSidebar } from '@/components/layouts/root-layout/app-sidebar'
import { SiteHeader } from '@/components/layouts/root-layout/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { useAuthStore } from '@/store/use-auth.store'

export const Route = createFileRoute('/admin')({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState()
    if (!isAuthenticated) {
      throw redirect({ to: '/login' })
    }
  },
  component: AdminLayout,
})

function AdminLayout() {
  const { isAuthenticated } = useAuthStore()
  const { location } = useRouterState()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== '/login') {
      router.navigate({ to: '/login', replace: true })
    }
  }, [isAuthenticated, location.pathname, router])

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <div className="flex-none">
          <SiteHeader />
        </div>

        <div className="flex-1 overflow-y-auto px-10 py-10">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
