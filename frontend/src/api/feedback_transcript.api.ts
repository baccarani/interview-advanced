import { AxiosInstance, GenericAbortSignal } from 'axios'
import {
  FeedbackTranscriptBody,
  FeedbackTranscriptResponse,
} from './types/feedback_transcript.types'

export const feedbackTranscriptAPI = {
  createFeedbackTranscript: async (
    api: AxiosInstance,
    cancel: GenericAbortSignal,
    params: { user_id: string },
    incomingData: FeedbackTranscriptBody
  ) => {
    try {
      const { user_id } = params
      const resp = await api.request({
        url: `/users/${user_id}/transcripts/feedbacks`,
        method: 'POST',
        data: incomingData,
        signal: cancel,
      })

      const {
        success,
        data,
        error,
      }: {
        success: boolean
        data: { feedbackTranscript: string | null; overallSessionScore: number }
        error: Error | null
      } = resp.data

      if (!success) throw error

      return data
    } catch (e: any) {
      return e
    }
  },
  getAllFeedbackTranscriptByUserId: async (
    api: AxiosInstance,
    cancel: GenericAbortSignal,
    params: { user_id: string },
    query: { page?: number; userQuery?: string }
  ) => {
    try {
      const { user_id } = params
      const { page, userQuery } = query
      let queryString = `/users/${user_id}/transcripts/feedbacks?`
      if (page) {
        queryString += `page=${page}`
      }
      if (userQuery && userQuery !== '') {
        queryString += `&${userQuery}`
      }
      const resp = await api.request({
        url: queryString,
        signal: cancel,
      })

      const { success, data, error }: FeedbackTranscriptResponse = resp.data

      if (!success) throw error

      return data
    } catch (e: any) {
      return e
    }
  },
  getFeedbackTranscriptById: async (
    api: AxiosInstance,
    cancel: GenericAbortSignal,
    params: { user_id: string; feedbackTranscript_id: string }
  ) => {
    try {
      const { user_id, feedbackTranscript_id } = params
      const resp = await api.request({
        url: `/users/${user_id}/transcripts/feedbacks/${feedbackTranscript_id}`,
        signal: cancel,
      })
      const { success, data, error }: FeedbackTranscriptResponse = resp.data

      if (!success) throw error
      return data
    } catch (e: any) {
      return e
    }
  },
  getRadarChartData: async (
    api: AxiosInstance,
    cancel: GenericAbortSignal,
    params: { user_id: string }
  ) => {
    try {
      const { user_id } = params
      const resp = await api.request({
        url: `/users/${user_id}/transcripts/feedbacks/generate`,
        signal: cancel,
      })
      const { success, data, error }: any = resp.data

      if (!success) throw error
      return data
    } catch (e: any) {
      return e
    }
  },
}
