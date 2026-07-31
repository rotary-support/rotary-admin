import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'

const COLLABORATOR_PATHS = ['/events', '/news', '/history', '/']

export function ProtectedRoute() {
  const { user, role, isLoading, signOut } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  // No autenticado → login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Autenticado pero sin rol de panel → mostrar mensaje, NO redirigir (evita loop)
  if (role !== 'admin' && role !== 'collaborator') {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <p className="text-lg text-muted-foreground">No tienes acceso al panel de administración.</p>
        <Button variant="outline" onClick={() => signOut()}>
          Cerrar sesión
        </Button>
      </div>
    )
  }

  // Collaborators solo pueden acceder a eventos, documentos y dashboard
  if (role === 'collaborator') {
    const isAllowed = COLLABORATOR_PATHS.some((path) =>
      path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
    )
    if (!isAllowed) {
      return <Navigate to="/" replace />
    }
  }

  return <Outlet />
}
