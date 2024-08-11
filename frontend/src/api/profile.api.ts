import { AxiosInstance, GenericAbortSignal } from 'axios'

type Profile = {
  name: string
  email: string
  picture: string
  sub: string
  isNewUser: boolean
}

export const profileApi = {
  getUserProfile: async (
    api: AxiosInstance,
    cancel: GenericAbortSignal
  ): Promise<Profile | null> => {
    try {
      const resp = await api.request({
        url: '/profile',
        signal: cancel,
      })

      const { data, success, error } = resp.data
      if (!success) throw error
      return data
    } catch (e: Error | any) {
      return null
    }
  },

  updateUserProfile: async (
    api: AxiosInstance,
    cancel: GenericAbortSignal,
    query: { isNewUser: boolean }
  ): Promise<Profile | null> => {
    try {
      const { isNewUser = false } = query

      const resp = await api.request({
        url: `/profile?isNewUser=${isNewUser}`,
        signal: cancel,
        method: 'PATCH',
      })
      const {
        data,
        success,
        error,
      }: {
        data: Profile
        success: boolean
        error: Error
      } = resp.data
      if (!success) throw error
      return data
    } catch (e: Error | any) {
      return e
    }
  },
}
