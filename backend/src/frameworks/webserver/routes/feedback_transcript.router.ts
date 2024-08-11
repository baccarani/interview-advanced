import feedbackTranscriptController from '../../../adapters/controller/feedback_transcript.controller'
import feedbackTranscriptRepositoryInterface from '../../../application/respositories/feedback_transcriptDBRepository'
import feedbackRepositoryImpl from '../../database/mongo/repositories/feedbackTranscriptRepositoryMongo'
import authServiceInterface from '../../../application/services/auth.service'
import authServiceImpl from '../../services/authService'

import {
  checkIfTokenExists,
  validateUserAccessToken,
} from '../middlerware/auth.middleware'

export default (express: any) => {
  const router = express.Router({ strict: true })
  const controller = feedbackTranscriptController(
    feedbackTranscriptRepositoryInterface,
    feedbackRepositoryImpl,
    authServiceInterface,
    authServiceImpl
  )

  router.post(
    '/',
    checkIfTokenExists,
    validateUserAccessToken,
    controller.addFeedbackTranscript
  )

  return router
}
