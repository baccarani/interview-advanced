import { useGoogleLogin } from '@react-oauth/google'
import { authAPI } from '@/api/auth.api'
import { useAuth } from '@/context/AuthProvider'
import { Button, buttonVariants } from '@/components/ui/button'
import GoogleLogo from '../../assets/google-logo.png'
import { useProfile } from '@/context/ProfileProvider'
import { privateApi } from '@/api/config/axiosConfig'
import axios from 'axios'

interface LoginBtnProps {
  showText?: boolean
}

export const LoginBtn = ({ showText }: LoginBtnProps) => {
  const { dispatch } = useAuth()
  const { setProfile } = useProfile()

  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async ({ code }) => {
      const controller = new AbortController()
      const resp = await authAPI.postGoogleLogin(
        privateApi,
        { token: code },
        controller.signal
      )

      if (resp instanceof Error) throw resp

      dispatch({ type: 'update_auth', payload: true })
      dispatch({ type: 'update_token', payload: resp.data })

      const profileResp = await axios.get(
        import.meta.env.VITE_PROD_BACKEND_URL + '/profile',
        { headers: { 'x-access-token': resp.data } }
      )

      // if (!profileResp) alert('Error')
      setProfile(profileResp.data.data)
      localStorage.setItem('state', 'true')
    },
    onError: (e: any) => {
      console.log(e.message)
    },
  })

  return (
    <Button
      onClick={login}
      className={`${buttonVariants({
        variant: 'default',
      })} flex items-center`}
    >
      <span className={`${showText ? 'inline' : 'hidden'} sm:inline mr-2`}>
        Sign in with Google
      </span>
      <img
        src={GoogleLogo}
        alt='Google Logo'
        className='flex-shrink-0 h-5 w-5'
      />
    </Button>
  )
}
