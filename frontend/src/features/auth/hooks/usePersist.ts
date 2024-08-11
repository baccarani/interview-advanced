import { useAuth } from '@/context/AuthProvider'
import { privateApi } from '../../../api/config/axiosConfig'
import { authAPI } from '../../../api/auth.api'
import { useProfile } from '@/context/ProfileProvider'
import { profileApi } from '@/api/profile.api'
import { isCancel } from 'axios'

export const usePersist = () => {
  const { dispatch, state } = useAuth()
  const { setProfile } = useProfile()
  const persist = async (): Promise<void> => {
    try {
      if (state.auth) return
      const controller = new AbortController()
      const authResponse = await authAPI.silentLogin(
        privateApi,
        controller.signal
      )
      if (authResponse instanceof Error) throw authResponse
      dispatch({ type: 'update_auth', payload: true })
      dispatch({ type: 'update_token', payload: authResponse.data })
      const profileResponse = await profileApi.getUserProfile(
        privateApi,
        controller.signal
      )
      if (profileResponse instanceof Error) throw profileResponse
      setProfile(profileResponse)
    } catch (e: unknown) {
      if (isCancel(e)) console.log(`Request Cancelled`)
    }
  }
  return persist
}
