import { useAuth } from '@/context/AuthProvider'
import { privateApi } from '../../../api/config/axiosConfig'
import { authAPI } from '../../../api/auth.api'
import { useLogout } from './useLogout'

type RefreshData = {
  success: boolean
  data: string | null
  error: Error | null
}

export const useRefresh = () => {
  const { dispatch } = useAuth()
  const logout = useLogout()
  const refresh = async (): Promise<string | undefined> => {
    try {
      const controller = new AbortController()
      const { data, error }: RefreshData = await authAPI.tokenRefresh(
        privateApi,
        controller.signal
      )
      if (!data) throw error
      dispatch({ type: 'update_token', payload: data })
      return data
    } catch (e: any) {
      logout()
      console.log(e.message)
    }
  }
  return refresh
}
