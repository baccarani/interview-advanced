import { useInterview } from '@/context/InterviewFlowProvider'
import { Navigate, Outlet } from 'react-router-dom'
export const RouteGuard = () => {
  const { state } = useInterview()
  const { roleInformation, interviewInformation } = state

  const { roleName } = roleInformation
  const { interviewId } = interviewInformation

  if (!roleName) return <Navigate to={'/'} />
  if (!interviewId) return <Navigate to={'/interview/check'} />

  return <Outlet />
}

export const RoleCheckGuard = () => {
  const roleName = localStorage.getItem('currentRole')
  if (!roleName) return <Navigate to={'/'} />
  return <Outlet />
}
