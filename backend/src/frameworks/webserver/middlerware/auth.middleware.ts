import { RequestHandler } from 'express'
import { JsonWebTokenError } from 'jsonwebtoken'
import { extractAuthHeader } from '../../../utils/auth'
import authServiceInterface from '../../../application/services/auth.service'
import authServiceImpl from '../../services/authService'

export const checkIfTokenExists: RequestHandler = (req, res, next) => {
  try {
    const token = req.headers['x-access-token']
    if (!token) throw new Error('Token Not Present!')
    next()
  } catch (e: any) {
    next(e)
  }
}

export const validateUserAccessToken: RequestHandler = (req, res, next) => {
  try {
    const token = extractAuthHeader(req.headers)
    const authService = authServiceInterface(authServiceImpl())
    const payload = authService.verifyToken(token ?? '')
    if (payload instanceof JsonWebTokenError) throw payload
    next()
  } catch (e: any) {
    next(e)
  }
}
