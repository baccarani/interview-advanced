import { AxiosError } from 'axios'

export type InterviewTranscriptData = {
  _id: string
  uuid: string
  responseCollection: [{ question: string; answer: string; catergroy: string }]
}

export type InterviewTranscriptBody = {
  uuid: string
  responseCollection: Array<{
    question: string
    answer: string
    catergory: string
  }>
}

export type InterviewTranscriptResponse = {
  success: boolean
  data:
    | null
    | [InterviewTranscriptData]
    | InterviewTranscriptData
    | { interviewTranscript: string }
  error: AxiosError | null
}
