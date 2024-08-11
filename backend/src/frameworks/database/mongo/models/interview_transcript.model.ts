import { Document, Schema, model } from 'mongoose'

export interface InterviewTranscript extends Document {
  sub: string
  uuid: string
  responseCollection: [ResponseCollection]
}

export interface ResponseCollection {
  question: string
  answer: string
  catergory: string
}

const interviewTranscriptSchema = new Schema<InterviewTranscript>(
  {
    sub: { type: String, required: true },
    uuid: { type: String, required: true },
    responseCollection: [
      {
        question: { type: String },
        answer: { type: String },
        catergory: { type: String, default: '' },
      },
    ],
  },
  { timestamps: true }
)

export default model<InterviewTranscript>(
  'interview_transcript',
  interviewTranscriptSchema
)
