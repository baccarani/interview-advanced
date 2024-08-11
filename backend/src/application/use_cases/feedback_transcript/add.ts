import feedbackTranscript from '../../../entity/feedback_transcript.entity'

const add = async (
  token: any,
  authService: any,
  feedbackTranscriptRepository: any,
  feedbackTranscriptData: any
) => {
  try {
    const decodedToken = await authService.verifyToken(token)
    if (decodedToken instanceof Error) throw decodedToken
    const { sub } = decodedToken
    const { feedbackEntries, standardUsed, totalScoreAsPerStandardUsed } =
      feedbackTranscriptData
    let overallSessionScore = (
      feedbackEntries.reduce((a: any, b: any) => {
        return a + b.overallScorePerResponse
      }, 0) / feedbackEntries.length
    ).toFixed(1)

    const newInterview = feedbackTranscript({
      feedbackEntries,
      metadata: {
        standardUsed,
        overallSessionScore: Number(overallSessionScore),
        totalScoreAsPerStandardUsed,
      },
      sub,
    })
    const data = await feedbackTranscriptRepository.add(newInterview)
    return {
      feedbackTranscript: data.id,
      overallSessionScore: data.metadata.overallSessionScore,
    }
    return data
  } catch (e) {
    return e
  }
}

export default add
