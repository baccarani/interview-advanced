import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import add from '../../application/use_cases/feedback_transcript/add'

const feedbackTranscriptController = (
  feedbackTranscriptDbRepositoryInterface: any,
  feedbackTranscriptDbRepositoryImpl: any,
  authServiceInterface: any,
  authServiceImpl: any
) => {
  const authService = authServiceInterface(authServiceImpl())
  const feedbackTranscriptDbRepo = feedbackTranscriptDbRepositoryInterface(
    feedbackTranscriptDbRepositoryImpl()
  )
  const addFeedbackTranscript: RequestHandler = async (req, res, next) => {
    try {
      const token = req.headers['x-access-token']
      const data = await add(
        token,
        authService,
        feedbackTranscriptDbRepo,
        req.body
      )
      if (data instanceof Error) throw data
      return res
        .status(StatusCodes.OK)
        .send({ success: true, data, error: null })
    } catch (e) {
      next(e)
    }
  }

  return {
    addFeedbackTranscript,
  }
}

export default feedbackTranscriptController
