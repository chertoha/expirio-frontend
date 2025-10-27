import { LoginForm } from '@/components/login-form'
import { useAuthStore } from '@/store/use-auth.store'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const { login, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: '/admin/dashboard', replace: true })
    }
  }, [isAuthenticated, navigate])

  if (isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
    // <div className="flex h-screen items-center justify-center bg-muted/30">
    //   <div className="bg-white p-8 rounded-xl shadow-lg w-96">
    //     <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
    //     <button
    //       onClick={login}
    //       className="w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
    //     >
    //       Войти (мок)
    //     </button>
    //   </div>
    // </div>
  )
}
