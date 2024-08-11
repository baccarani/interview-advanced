import { AxiosError } from 'axios'

export interface SkillsFeedback {
  communicationFeedback: string
  teamworkFeedback: string
  problemSolvingFeedback: string
}

export interface SkillsScore {
  communicationScore: number
  teamworkScore: number
  problemSolvingScore: number
}

export type FeedbackTranscriptBody = {
  feedbackEntries: Array<{
    skillsFeedback: SkillsFeedback
    skillsScore: SkillsScore
    overallFeedback: string
    overallScore: number
  }>
  totalScoreAsPerStandardUsed?: number
  standardUsed?: string
}

export type FeedbackTranscriptData = {
  _id: string
  sub: string
  feedback: Array<{
    _id: string
    generatedResponse: string
    scorePerResponse: number
    totalScoreAsPerStandardUsed: number
    standardUsed: string
  }>
  createdAt: string
  updatedAt: string
}

export type FeedbackTranscriptResponse = {
  success: boolean
  data:
    | null
    | [FeedbackTranscriptData]
    | FeedbackTranscriptData
    | { feedbackTranscript: string }
  error: AxiosError | null
}

export type FeedbackTranscript = {
  skillsFeedback: SkillsFeedback
  skillsScore: SkillsScore
  overallFeedback: string
  overallScore: number
}
