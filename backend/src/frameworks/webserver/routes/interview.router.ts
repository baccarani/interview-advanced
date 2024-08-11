import interviewController from '../../../adapters/controller/interview.controller'
import interviewRepositoryInterface from '../../../application/respositories/interviewDBRepository'
import interviewRepositoryImpl from '../../database/mongo/repositories/interviewRepositoryMongo'
import authServiceInterface from '../../../application/services/auth.service'
import authServiceImpl from '../../services/authService'

import {
  checkIfTokenExists,
  validateUserAccessToken,
} from '../middlerware/auth.middleware'

export default (express: any) => {
  const router = express.Router({ strict: true })
  const controller = interviewController(
    interviewRepositoryInterface,
    interviewRepositoryImpl,
    authServiceInterface,
    authServiceImpl
  )

  router.post(
    '/',
    checkIfTokenExists,
    validateUserAccessToken,
    controller.addNewInterview
  )
  router.get(
    '/all',
    checkIfTokenExists,
    validateUserAccessToken,
    controller.getAllInterviews
  )
  router.get(
    '/:id',
    checkIfTokenExists,
    validateUserAccessToken,
    controller.getInterviewById
  )
  router.delete(
    '/:id',
    checkIfTokenExists,
    validateUserAccessToken,
    controller.deleteInterviewById
  )
  router.patch(
    '/:id',
    checkIfTokenExists,
    validateUserAccessToken,
    controller.updateInterviewById
  )

  return router
}
