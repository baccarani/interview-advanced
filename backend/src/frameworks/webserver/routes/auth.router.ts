import authController from '../../../adapters/controller/auth.controller'
import authServiceInterface from '../../../application/services/auth.service'
import authServiceImplementation from '../../services/authService'
import googleServiceImpl from '../../services/googleOAuthService'
import googleServiceInterface from '../../../application/services/google.service'
import profileRepository from '../../../application/respositories/profileDBRepository'
import profileRepositoryMongodb from '../../database/mongo/repositories/profileRepositoryMongodb'
import interviewQuotaRepositoryInterface from '../../../application/respositories/interviewQuotaDBRepository'
import interviewQuoteRepositoryImpl from '../../database/mongo/repositories/interviewQuoteRepositoryMongo'

export default (express: any) => {
  const router = express.Router({ strict: true })
  const controller = authController(
    profileRepository,
    profileRepositoryMongodb,
    interviewQuotaRepositoryInterface,
    interviewQuoteRepositoryImpl,
    authServiceInterface,
    authServiceImplementation,
    googleServiceInterface,
    googleServiceImpl
  )

  router.route('/login').get(controller.loginUser)
  router.route('/logout').get(controller.logoutUser)
  router.route('/silent').get(controller.silentLoginUser)
  router.route('/refresh').get(controller.tokenRefreshUser)
  router.route('/login/dev').get(controller.devLoginUser)
  return router
}
