import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/auth-context'
import { LoginForm } from '@/components/auth/login-form'

export default function LoginPage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (user) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <LoginForm />
    </div>
  )
}
