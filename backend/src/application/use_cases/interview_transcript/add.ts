import interviewTranscript from '../../../entity/interview_transcript.entity'

const add = async (
  token: any,
  authService: any,
  interviewTranscriptRepository: any,
  interviewTranscriptData: any
) => {
  try {
    const { responseCollection, uuid } = interviewTranscriptData
    const decodedToken = await authService.verifyToken(token)
    if (decodedToken instanceof Error) throw decodedToken
    const { sub } = decodedToken
    const newInterview = interviewTranscript({ responseCollection, sub, uuid })
    const data = await interviewTranscriptRepository.add(newInterview)
    return { interviewTranscript: data._id }
  } catch (e) {
    return e
  }
}

export default add
