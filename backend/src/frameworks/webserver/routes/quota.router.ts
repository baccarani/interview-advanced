import { Router } from 'express'
import quotaController from '../../../adapters/controller/quota.controller'
import interviewQuotaRepositoryInterface from '../../../application/respositories/interviewQuotaDBRepository'
import interviewQuoteRepositoryImpl from '../../database/mongo/repositories/interviewQuoteRepositoryMongo'
import authServiceImpl from '../../services/authService'
import authServiceInterface from '../../../application/services/auth.service'
import { tryCatchWrapper } from '../../../utils/tryCatch'
import {
  checkIfTokenExists,
  validateUserAccessToken,
} from '../middlerware/auth.middleware'

export default (express: any) => {
  const router: Router = express.Router()
  const controller = quotaController(
    interviewQuotaRepositoryInterface,
    interviewQuoteRepositoryImpl,
    authServiceInterface,
    authServiceImpl
  )

  router.get(
    '/',
    checkIfTokenExists,
    validateUserAccessToken,
    tryCatchWrapper(controller.findQuotaByParams)
  )

  router.get(
    '/validate',
    checkIfTokenExists,
    validateUserAccessToken,
    tryCatchWrapper(controller.validateUserQuota)
  )
  router.patch(
    '/',
    checkIfTokenExists,
    validateUserAccessToken,
    tryCatchWrapper(controller.updateQuotaByParams)
  )

  return router
}
