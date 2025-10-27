import {
  Outlet,
  createFileRoute,
  redirect,
  useRouter,
  useRouterState,
} from '@tanstack/react-router'
import { useAuthStore } from '@/store/use-auth.store'
import { useEffect } from 'react'

// import { AppSidebar } from '@/components/app-sidebar'
// import { ChartAreaInteractive } from '@/components/chart-area-interactive'
// import { DataTable } from '@/components/data-table'
// import { SectionCards } from '@/components/section-cards'
// import { SiteHeader } from '@/components/site-header'
// import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import data from '@/utils/mocks/dashboardData.json'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layouts/root-layout/app-sidebar'
import { SiteHeader } from '@/components/layouts/root-layout/site-header'
import { SectionCards } from '@/components/layouts/root-layout/section-cards'
import { ChartAreaInteractive } from '@/components/layouts/root-layout/chart-area-interactive'
import { DataTable } from '@/components/layouts/root-layout/data-table'

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
  const { isAuthenticated, logout } = useAuthStore()
  const { location } = useRouterState()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== '/login') {
      router.navigate({ to: '/login', replace: true })
    }
  }, [isAuthenticated, location.pathname, router])

  return (
    // <div className="flex flex-col min-h-screen">
    //   <header className="p-4 border-b flex justify-between bg-white">
    //     <h1 className="font-semibold">Admin Panel</h1>
    //     <button onClick={logout} className="text-sm text-blue-600 underline">
    //       LogOut
    //     </button>
    //   </header>

    //   <main className="flex-1 p-6 bg-gray-50">
    //     <Outlet />
    //   </main>

    //   <footer className="p-4 text-xs text-gray-400 bg-white border-t">
    //     {location.pathname}
    //   </footer>
    // </div>

    <>
      <SidebarProvider
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 72)',
            '--header-height': 'calc(var(--spacing) * 12)',
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards />
                <div className="px-4 lg:px-6">
                  <ChartAreaInteractive />
                </div>
                <DataTable data={data} />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
