import { Types } from 'mongoose'

const interview = ({
  sub,
  jobName,
  jobDescription,
  interviewState,
  averageScore,
  numberOfQuestionsAsked,
  typeOfQuestionsAsked,
  difficultyOfQuestionsAsked,
  interviewTranscript,
  feedbackTranscript,
}: {
  sub: string
  jobName: string
  jobDescription: string
  interviewState: 'in-progress' | 'completed'
  averageScore: number
  numberOfQuestionsAsked: number
  typeOfQuestionsAsked: 'technical' | 'behavioral' | 'mixed'
  difficultyOfQuestionsAsked: 'easy' | 'medium' | 'hard' | 'advanced'
  interviewTranscript: Types.ObjectId
  feedbackTranscript: Types.ObjectId
}) => {
  return {
    getSub: () => sub,
    getJobName: () => jobName,
    getJobDescription: () => jobDescription,
    getInterviewState: () => interviewState,
    getAverageScore: () => averageScore,
    getNumberofQuestionsAsked: () => numberOfQuestionsAsked,
    gettypeOfQuestionsAsked: () => typeOfQuestionsAsked,
    getdifficultyOfQuestionsAsked: () => difficultyOfQuestionsAsked,
    getInterviewTranscript: () => interviewTranscript,
    getFeedbackTranscript: () => feedbackTranscript,
  }
}

export default interview
