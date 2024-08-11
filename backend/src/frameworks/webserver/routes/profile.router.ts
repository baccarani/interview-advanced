import { Router } from 'express'
import profileController from '../../../adapters/controller/profile.controller'
import profileRepositoryMongodb from '../../database/mongo/repositories/profileRepositoryMongodb'
import profileRepository from '../../../application/respositories/profileDBRepository'
import authServiceImpl from '../../services/authService'
import authServiceInterface from '../../../application/services/auth.service'
import { tryCatchWrapper } from '../../../utils/tryCatch'
import {
  checkIfTokenExists,
  validateUserAccessToken,
} from '../middlerware/auth.middleware'

const profileRouter = (express: any) => {
  const router: Router = express.Router({ strict: true })
  const controller = profileController(
    profileRepository,
    profileRepositoryMongodb,
    authServiceInterface,
    authServiceImpl
  )
  router.get(
    '/',
    checkIfTokenExists,
    validateUserAccessToken,
    tryCatchWrapper(controller.fetchUserByParams)
  )
  return router
}

export default profileRouter
