import { AxiosError } from 'axios'

export type InterviewData = {
  _id: string
  sub: string
  jobName: string
  jobDescription: string
  interviewState: string
  interviewTranscript: string
  feedbackTranscript: string
  averageScore?: number
  difficultyOfQuestionsAsked: string
  numberOfQuestionsAsked: number
  typeOfQuestionsAsked: string
  createdAt: string
  updatedAt: string
}

export type InterviewBody = {
  jobName: string
  jobDescription?: string
  interviewState?: string
  interviewTranscript: string
  feedbackTranscript: string
  averageScore: number
  numberOfQuestionsAsked: number
  typeOfQuestionsAsked: string
  difficultyOfQuestionsAsked: string
}

export type InterviewAnalytics = {
  avgScoreOverall: number
  totalScore: number
  totalInterviewCount: number
  mostFrequentRole: string
}

export type InterviewResponse = {
  success: boolean
  data: null | [InterviewData] | InterviewData | InterviewAnalytics
  error: AxiosError | null
}
