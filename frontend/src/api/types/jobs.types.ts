import { AxiosError } from 'axios'

export type InterviewData = {
  _id: string
  sub: string
  jobName: string
  jobDescription: string
  interviewState: string
  interviewTranscript: string
}

export type InterviewBody = {
  jobName: string
  jobDescription?: string
  interviewState?: string
  interviewTranscript: string
  feedbackTranscript?: string
}

export type InterviewResponse = {
  success: boolean
  data: null | [InterviewData] | InterviewData
  error: AxiosError | null
}
