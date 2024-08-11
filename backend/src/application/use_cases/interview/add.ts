import interview from '../../../entity/interview.entity'

const add = async (
  token: any,
  authService: any,
  interviewRepository: any,
  interviewData: any
) => {
  try {
    const {
      jobName,
      jobDescription,
      interviewState,
      averageScore,
      difficultyOfQuestionsAsked,
      interviewTranscript,
      feedbackTranscript,
      numberOfQuestionsAsked,
      typeOfQuestionsAsked,
    } = interviewData
    const decodedToken = await authService.verifyToken(token)
    if (decodedToken instanceof Error) throw decodedToken
    const { sub } = decodedToken
    const newInterview = interview({
      sub,
      jobName,
      jobDescription,
      interviewState,
      averageScore,
      difficultyOfQuestionsAsked,
      interviewTranscript,
      feedbackTranscript,
      numberOfQuestionsAsked,
      typeOfQuestionsAsked,
    })

    return await interviewRepository.add(newInterview)
  } catch (e) {
    return e
  }
}

export default add
