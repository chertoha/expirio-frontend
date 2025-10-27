import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import {
  loginDefaultValues,
  loginFormSchema,
  type LoginFormValues,
} from '@/utils/forms/auth'
import { useAuthStore } from '@/store/use-auth.store'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

const defaultEmail = 'admin@email.com'
const defaultPassword = '123456'

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { login } = useAuthStore()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const methods = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: loginDefaultValues,
  })

  const onSubmit: SubmitHandler<LoginFormValues> = ({ email, password }) => {
    setError(null)
    setLoading(true)
    setTimeout(() => {
      if (email === defaultEmail && password === defaultPassword) {
        login()
      } else {
        setError('Wrong e-mail or password')
      }
      setLoading(false)
    }, 800)
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to Expirio admin panel</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  defaultValue={defaultEmail}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...methods.register('email')}
                />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    defaultValue={defaultPassword}
                    {...methods.register('password')}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff size={18} strokeWidth={1.75} />
                    ) : (
                      <Eye size={18} strokeWidth={1.75} />
                    )}
                  </button>
                </div>
              </Field>

              {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

              <Field>
                <Button type="submit">
                  {loading ? 'Loading...' : 'Login'}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
