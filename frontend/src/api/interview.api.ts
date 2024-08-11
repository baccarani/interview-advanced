import { AxiosError, AxiosInstance, GenericAbortSignal } from 'axios'
import { InterviewBody, InterviewResponse } from './types/interview.types'

export const interviewAPI = {
  createNewInterview: async (
    api: AxiosInstance,
    signal: GenericAbortSignal,
    params: { user_id: string },
    data: InterviewBody
  ) => {
    try {
      const { user_id } = params
      const resp: { data: InterviewResponse } = await api.request({
        url: `/users/${user_id}/interviews`,
        method: 'POST',
        data,
        signal,
      })

      if (!resp.data.success) throw resp.data.error
      return resp.data.data
    } catch (e) {
      return e
    }
  },
  getInterviewByUserId: async (
    api: AxiosInstance,
    signal: GenericAbortSignal,
    params: { user_id: string },
    query: {
      page?: number
      userQuery?: string
    }
  ) => {
    try {
      const { user_id } = params
      const { page, userQuery } = query
      let queryString = `/users/${user_id}/interviews/all?`
      if (page) {
        queryString += `page=${page}`
      }
      if (userQuery && userQuery !== '') {
        queryString += `&${userQuery}`
      }
      const resp = await api.request({
        url: queryString,
        signal,
      })
      const { data, error, success } = resp.data
      if (!success) throw error
      return data
    } catch (e: AxiosError | any) {
      return e
    }
  },

  getInterviewByJobId: async (
    api: AxiosInstance,
    signal: GenericAbortSignal,
    params: { user_id: string; interview_id: string },
    query: { populate: boolean }
  ) => {
    try {
      const { user_id, interview_id } = params
      const { populate } = query
      const resp = await api.request({
        url: `/users/${user_id}/interviews/${interview_id}?populate=${populate}`,
        signal,
      })
      const { data, error, success } = resp.data
      if (!success) throw error
      return data
    } catch (e: any) {
      return e
    }
  },

  getInterviewAnalytics: async (
    api: AxiosInstance,
    signal: GenericAbortSignal,
    params: { user_id: string }
  ) => {
    try {
      const { user_id } = params
      const resp: { data: InterviewResponse } = await api.request({
        url: `/users/${user_id}/analytics/dashboard`,
        signal,
      })
      const { success, data, error }: any = resp.data
      if (!success) throw error
      return data
    } catch (e: any) {
      return e
    }
  },

  deleteInterviewById: async (
    api: AxiosInstance,
    cancel: GenericAbortSignal,
    params: { user_id: string; interview_id: string }
  ) => {
    try {
      const { interview_id, user_id } = params
      const resp = await api.request({
        url: `/users/${user_id}/interviews/${interview_id}`,
        method: 'DELETE',
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
