import { Document, Schema, Types, model } from 'mongoose'

export interface InterviewSchema extends Document {
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
}

const Interview = new Schema<InterviewSchema>(
  {
    sub: { type: String, required: true },
    jobName: { type: String, required: true },
    jobDescription: { type: String, default: '' },
    interviewState: { type: String, default: 'in-progress' },
    averageScore: { type: Number, required: true },
    numberOfQuestionsAsked: { type: Number, default: 3 },
    typeOfQuestionsAsked: { type: String, required: true, default: 'mixed' },
    difficultyOfQuestionsAsked: {
      type: String,
      required: true,
      default: 'medium',
    },
    interviewTranscript: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'interview_transcript',
      default: '',
    },
    feedbackTranscript: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'feedback_transcript',
      default: '',
    },
  },
  { timestamps: true }
)

export default model<InterviewSchema>('interview', Interview)
