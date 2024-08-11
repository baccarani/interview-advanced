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

const feedbackTranscript = ({
  sub,
  feedbackEntries,
  metadata,
}: {
  sub: string
  feedbackEntries: Array<{
    skillsFeedback: SkillsFeedback
    skillsScore: SkillsScore
    overallFeedbackPerResponse: string
    overallScorePerResponse: number
  }>
  metadata: FeedbackTranscriptMetaData
}) => {
  return {
    getSub: () => sub,
    getFeedbackEntries: () => feedbackEntries,
    getMetaData: () => metadata,
  }
}

export default feedbackTranscript
