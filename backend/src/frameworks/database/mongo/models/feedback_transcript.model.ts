import { Schema, model, Document } from 'mongoose'

interface FeedbackTranscriptMetaData {
  totalScoreAsPerStandardUsed: number
  standardUsed: string
  overallSessionScore: number
}

interface SkillsFeedback {
  communicationFeedback: string
  teamworkFeedback: string
  problemSolvingFeedback: string
  adaptabilityFeedback: string
  creativityFeedback: string
  leadershipFeedback: string
}

interface SkillsScore {
  communicationScore: number
  teamworkScore: number
  problemSolvingScore: number
  adaptabilityScore: number
  creativityScore: number
  leadershipScore: number
}

export interface FeedbackTranscript extends Document {
  sub: string
  feedbackEntries: Array<{
    skillsFeedback: SkillsFeedback
    skillsScore: SkillsScore
    overallFeedbackPerResponse: string
    overallScorePerResponse: number
  }>
  metadata: FeedbackTranscriptMetaData
}

const feedbackTranscriptSchema = new Schema<FeedbackTranscript>(
  {
    sub: {
      type: String,
      required: true,
    },

    feedbackEntries: [
      {
        skillsFeedback: {
          communicationFeedback: { type: String, required: true },
          teamworkFeedback: { type: String, required: true },
          problemSolvingFeedback: { type: String, required: true },
          adaptabilityFeedback: { type: String, required: true },
          creativityFeedback: { type: String, required: true },
          leadershipFeedback: { type: String, required: true },
        },
        skillsScore: {
          communicationScore: { type: Number, required: true, min: 1, max: 5 },
          teamworkScore: { type: Number, required: true, min: 1, max: 5 },
          problemSolvingScore: { type: Number, required: true, min: 1, max: 5 },
          adaptabilityScore: { type: Number, required: true, min: 1, max: 5 },
          creativityScore: { type: Number, required: true, min: 1, max: 5 },
          leadershipScore: { type: Number, required: true, min: 1, max: 5 },
        },
        overallFeedbackPerResponse: {
          type: String,
          required: true,
          default: 'Not Available',
        },
        overallScorePerResponse: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
          default: 0,
        },
      },
    ],

    metadata: {
      totalScoreAsPerStandardUsed: {
        type: Number,
        required: true,
        default: 5,
      },
      standardUsed: {
        type: String,
        required: true,
        default: 'STAR',
      },
      overallSessionScore: { type: Number, required: true, default: 0 },
    },
  },
  { timestamps: true }
)

const FeedbackTranscriptModel = model<FeedbackTranscript>(
  'feedback_transcript',
  feedbackTranscriptSchema
)

export default FeedbackTranscriptModel
