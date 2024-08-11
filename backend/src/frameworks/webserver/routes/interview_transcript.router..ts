import interviewTranscriptController from '../../../adapters/controller/interview_transcript.controller'
import interviewTranscriptRepositoryInterface from '../../../application/respositories/interview_transcriptDBRepository'
import interviewTranscriptRepositoryImpl from '../../database/mongo/repositories/interviewTranscriptRepositoryMongo'
import authServiceInterface from '../../../application/services/auth.service'
import authServiceImpl from '../../services/authService'

import {
  checkIfTokenExists,
  validateUserAccessToken,
} from '../middlerware/auth.middleware'

export default (express: any) => {
  const router = express.Router({ strict: true })
  const controller = interviewTranscriptController(
    interviewTranscriptRepositoryInterface,
    interviewTranscriptRepositoryImpl,
    authServiceInterface,
    authServiceImpl
  )

  router.post(
    '/',
    checkIfTokenExists,
    validateUserAccessToken,
    controller.addNewInterviewTranscript
  )

  return router
}
