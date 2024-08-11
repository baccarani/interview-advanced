import { AxiosInstance, GenericAbortSignal } from 'axios'

export const quotaAPI = {
  getUserInterviewQuota: async (
    api: AxiosInstance,
    cancel: GenericAbortSignal
  ) => {
    try {
      const resp = await api.request({
        url: `/quota`,
        signal: cancel,
      })
      if (resp instanceof Error) throw resp
      const { data } = resp.data
      return data
    } catch (e) {
      return e
    }
  },
  validateInterviewQuota: async (
    api: AxiosInstance,
    cancel: GenericAbortSignal
  ) => {
    try {
      const resp = await api.request({ url: `/quota/validate`, signal: cancel })
      if (resp instanceof Error) throw resp
      const { data } = resp.data
      return data
    } catch (e) {
      return e
    }
  },
  updateInterviewQuota: async (
    api: AxiosInstance,
    cancel: GenericAbortSignal
  ) => {
    try {
      const resp = await api.request({
        url: `/quota`,
        method: 'PATCH',
        signal: cancel,
      })
      if (resp instanceof Error) throw resp
      return resp.data.data
    } catch (e) {
      return e
    }
  },
}
