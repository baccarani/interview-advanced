import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import add from '../../application/use_cases/interview_transcript/add'

const interviewTranscriptController = (
  interviewTranscriptDbRepositoryInterface: any,
  interviewTranscriptDbRepositoryImpl: any,
  authServiceInterface: any,
  authServiceImpl: any
) => {
  const authService = authServiceInterface(authServiceImpl())
  const interviewTranscriptDbRepo = interviewTranscriptDbRepositoryInterface(
    interviewTranscriptDbRepositoryImpl()
  )
  const addNewInterviewTranscript: RequestHandler = async (req, res, next) => {
    try {
      const token = req.headers['x-access-token']
      const data = await add(
        token,
        authService,
        interviewTranscriptDbRepo,
        req.body
      )
      if (data instanceof Error) throw data
      return res.status(StatusCodes.OK).send({
        success: true,
        data,
        error: null,
      })
    } catch (e) {
      next(e)
    }
  }

  return {
    addNewInterviewTranscript,
  }
}

export default interviewTranscriptController
