import analyticsController from '../../../adapters/controller/analytics.controller'
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
  const controller = analyticsController(
    interviewRepositoryInterface,
    interviewRepositoryImpl,
    authServiceInterface,
    authServiceImpl
  )

  router.get(
    '/dashboard',
    checkIfTokenExists,
    validateUserAccessToken,
    controller.getDashboardAnalytics
  )

  return router
}
