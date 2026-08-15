import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../features/auth/store/authStore'
import { LoadingState } from '../../shared/components/LoadingState'

export function ProtectedRoute() {
  const { user, isLoading } = useAuthStore()
  const location = useLocation()
  if (isLoading) return <LoadingState label="Checking your session…" />
  return user ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />
}
