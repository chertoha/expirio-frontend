import type { QueryClient } from '@tanstack/react-query'

import {
  createRootRouteWithContext,
  Outlet,
  redirect,
} from '@tanstack/react-router'

import { useAuthStore } from '@/store/use-auth.store'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: ({ location }) => {
    const { isAuthenticated } = useAuthStore.getState()

    if (!isAuthenticated && location.pathname !== '/login') {
      throw redirect({ to: '/login' })
    }

    if (isAuthenticated && location.pathname === '/login') {
      throw redirect({ to: '/admin/dashboard' })
    }
  },

  component: () => <Outlet />,
})
