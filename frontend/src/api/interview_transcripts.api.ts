import {
  AxiosError,
  AxiosInstance,
  GenericAbortSignal,
  isAxiosError,
} from 'axios'

import {
  InterviewTranscriptResponse,
  InterviewTranscriptBody,
} from './types/interview_transcript.types'

export const interviewTranscriptAPI = {
  createInterviewTranscript: async (
    api: AxiosInstance,
    cancel: GenericAbortSignal,
    params: { user_id: string },
    data: InterviewTranscriptBody
  ) => {
    try {
      const { user_id } = params
      const response: { data: InterviewTranscriptResponse } = await api.request(
        {
          url: `/users/${user_id}/transcripts/interviews`,
          method: 'POST',
          data,
          signal: cancel,
        }
      )
      return response.data.data
    } catch (e) {
      if (isAxiosError(e)) {
        return e.response?.data
      }
      console.log(e)
    }
  },
  getInterviewTranscriptByUserId: async (
    api: AxiosInstance,
    cancel: GenericAbortSignal,
    params: { user_id: string }
  ) => {
    try {
      const { user_id } = params
      const responseData: InterviewTranscriptResponse = (
        await api.request({
          url: `/users/${user_id}/transcripts/interviews`,
          signal: cancel,
        })
      ).data

      return responseData
    } catch (e: AxiosError | any) {
      if (isAxiosError(e)) {
        return e.response?.data
      }
      console.log(e)
    }
  },
  getInterviewTranscriptById: async (
    api: AxiosInstance,
    cancel: GenericAbortSignal,
    data: { user_id: string; interview_id: string }
  ) => {
    try {
      const { user_id, interview_id } = data
      const resp: { data: InterviewTranscriptResponse } = await api.request({
        url: `/users/${user_id}/transcripts/interviews/${interview_id}`,
        signal: cancel,
      })
      return resp.data
    } catch (e: any) {
      return e
    }
  },
  updateInterviewTranscriptById: async (
    api: AxiosInstance,
    cancel: GenericAbortSignal,
    params: { user_id: string; interview_id: string },
    data: {
      responseData: Array<{
        question: string
        answer: string
        category: string
      }>
    }
  ) => {
    try {
      const { user_id, interview_id } = params
      const resp: { data: InterviewTranscriptResponse } = await api.request({
        url: `/users/${user_id}/transcripts/interviews/${interview_id}`,
        signal: cancel,
        data,
      })
      return resp.data
    } catch (e: any) {
      if (isAxiosError(e)) return e.response?.data
      console.log(e)
    }
  },
}
