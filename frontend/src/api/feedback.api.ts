import { AxiosInstance, GenericAbortSignal } from 'axios'

export const feedbackAPI = {
  getFeedbackAll: async (api: AxiosInstance, cancel: GenericAbortSignal) => {
    try {
      const resp = await api.request({
        url: '/feedback',
        signal: cancel,
      })
      return resp.data
    } catch (e: any) {
      return e
    }
  },
}
