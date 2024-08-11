import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthProvider'
import { useProfile } from '@/context/ProfileProvider'
import { authAPI } from '@/api/auth.api'
import { privateApi } from '@/api/config/axiosConfig'
import axios, { GenericAbortSignal, isCancel } from 'axios'
import LandingLoader from '@/commons/components/LandingLoader'

export const PersistLogin = () => {
  const { state, dispatch } = useAuth()
  const { setProfile } = useProfile()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const persistLogin = async (cancel: GenericAbortSignal) => {
    try {
      const resp = await authAPI.silentLogin(privateApi, cancel)
      if (resp instanceof Error) throw resp
      dispatch({ type: 'update_token', payload: resp.data })
      dispatch({ type: 'update_auth', payload: true })
      return resp.data
    } catch (e) {
      return e
    }
  }
  const getProfile = async (
    token: string,
    cancel: GenericAbortSignal
  ): Promise<Error | null> => {
    try {
      const profileResp = await axios.get(
        import.meta.env.VITE_PROD_BACKEND_URL + '/profile',
        { headers: { 'x-access-token': token }, signal: cancel }
      )
      if (profileResp instanceof Error) throw profileResp
      setProfile(profileResp.data.data)
      return null
    } catch (e) {
      if (e instanceof Error) return e
      return null
    }
  }

  useEffect(() => {
    const newController = new AbortController()
    if (state.auth) return
    if (localStorage.getItem('state') === 'true') {
      setIsLoading((prev) => !prev)
      ;(async () => {
        try {
          const token = await persistLogin(newController.signal)
          if (token instanceof Error) throw token
          const error = await getProfile(token, newController.signal)
          if (error) throw error
        } catch (e) {
          if (isCancel(e)) console.log('Request Cancelled')
        } finally {
          setIsLoading((prev) => !prev)
        }
      })()
    }

    return () => {
      newController.abort()
    }
  }, [])

  //loading feature to be implemented
  return <>{isLoading ? <LandingLoader /> : <Outlet />}</>
}
