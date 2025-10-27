import {
  Outlet,
  createFileRoute,
  redirect,
  useRouter,
  useRouterState,
} from '@tanstack/react-router'
import { useAuthStore } from '@/store/use-auth.store'
import { useEffect } from 'react'

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
    <div className="flex flex-col min-h-screen">
      {/* Хедер */}
      <header className="p-4 border-b flex justify-between bg-white">
        <h1 className="font-semibold">Admin Panel</h1>
        <button onClick={logout} className="text-sm text-blue-600 underline">
          Выйти
        </button>
      </header>

      {/* Контент */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>

      {/* Футер */}
      <footer className="p-4 text-xs text-gray-400 bg-white border-t">
        {location.pathname}
      </footer>
    </div>
  )
}
