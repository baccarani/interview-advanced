import { useAuth } from '@/context/AuthProvider'
import { Navigate, Outlet } from 'react-router-dom'

export const Protected = () => {
  const { state } = useAuth()
  return state.auth ? <Outlet /> : <Navigate to={'/'} />
}
