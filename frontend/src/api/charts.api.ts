import { AxiosInstance, GenericAbortSignal } from 'axios'

export const chartApi = {
  // Get Chart Data for Dashboard

  getChartDataDashboard: async (
    api: AxiosInstance,
    cancel: GenericAbortSignal,
    params: { user_id: string },
    query: { range: number }
  ) => {
    try {
      const { user_id } = params
      const { range } = query
      const resp = await api.request({
        url: `/users/${user_id}/charts/dashboard?range=${range}`,
        signal: cancel,
      })
      const { success, data, error } = resp.data
      if (!success) throw error
      return data
    } catch (e) {
      return e
    }
  },

  // Get Line Chart Data for Result
  getLineChartResult: async (
    api: AxiosInstance,
    cancel: GenericAbortSignal,
    params: { user_id: string },
    query: { interview_id: string }
  ) => {
    try {
      const { user_id } = params
      const { interview_id } = query
      const resp = await api.request({
        url: `/users/${user_id}/charts/result?interview_id=${interview_id}`,
        signal: cancel,
      })
      const { success, data, error } = resp.data
      if (!success) throw error
      return data
    } catch (e) {
      return e
    }
  },
}
