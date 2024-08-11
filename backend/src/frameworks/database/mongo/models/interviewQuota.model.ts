import { Schema, model } from 'mongoose'

interface InterviewQuotaSchema {
  sub: string
  availableInterviews: number
  usedInterviews: number
}

const InterviewQuotaSchema = new Schema<InterviewQuotaSchema>(
  {
    sub: { type: String, required: true },
    availableInterviews: { type: Number, required: true, default: 3 },
    usedInterviews: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
)

export default model('interview_quota', InterviewQuotaSchema)
