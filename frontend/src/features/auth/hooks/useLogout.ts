import { useAuth } from '@/context/AuthProvider'
import { authAPI } from '../../../api/auth.api'
import { AxiosError } from 'axios'
import { privateApi } from '@/api/config/axiosConfig'
import { useProfile } from '@/context/ProfileProvider'

export const useLogout = () => {
  const { dispatch } = useAuth()
  const { setProfile } = useProfile()

  const logout = async () => {
    try {
      const controller = new AbortController()
      const resp = await authAPI.userLogout(privateApi, controller.signal)
      if (resp instanceof AxiosError) throw resp
    } catch (e: any) {
      console.log(e.message)
    } finally {
      dispatch({ type: 'reset_auth', payload: null })
      setProfile(null)
      localStorage.setItem('state', 'false')
    }
  }
  return logout
}
