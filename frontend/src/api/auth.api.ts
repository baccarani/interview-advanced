import { AxiosInstance, GenericAbortSignal } from 'axios'

export const authAPI = {
  postGoogleLogin: async (
    api: AxiosInstance,
    query: { token: string },
    cancel: GenericAbortSignal
  ): Promise<{ data: any; error: null; success: boolean } | Error> => {
    try {
      const { token = '' } = query
      const resp = await api.request({
        url: `/auth/login?token=${token}`,
        signal: cancel,
      })
      return resp.data
    } catch (e: any) {
      return e
    }
  },

  silentLogin: async (api: AxiosInstance, cancel: GenericAbortSignal) => {
    try {
      const resp = await api.request({
        url: '/auth/silent',
        signal: cancel,
      })
      return resp.data
    } catch (e) {
      return e
    }
  },

  tokenRefresh: async (api: AxiosInstance, cancel: GenericAbortSignal) => {
    try {
      const resp = await api.request({ url: '/auth/refresh', signal: cancel })
      return resp.data
    } catch (e) {
      return e
    }
  },

  userLogout: async (api: AxiosInstance, cancel: GenericAbortSignal) => {
    try {
      const resp = await api.request({
        url: '/auth/logout',
        signal: cancel,
      })
      return resp.status
    } catch (e: any) {
      return e
    }
  },
}
