import { RequestHandler } from 'express'
import { JsonWebTokenError } from 'jsonwebtoken'
import { extractAuthHeader } from '../utils/auth'
import { verifyToken } from '../utils/jwt'
import BadRequestError from '../errors/badrequest.error'

export const checkIfTokenExists: RequestHandler = (req, res, next) => {
  try {
    const token = req.headers['x-access-token']
    if (!token) throw new Error('Token Not Present!')
    next()
  } catch (e: any) {
    const context = { key: [e.message] }
    next(
      new BadRequestError({
        code: 404,
        logging: false,
        message: 'INVALID TOKEN',
        context,
      })
    )
  }
}

export const validateUserAccessToken: RequestHandler = (req, res, next) => {
  try {
    const token = extractAuthHeader(req.headers)
    const payload = verifyToken(token ?? '')
    if (payload instanceof JsonWebTokenError) throw payload
    next()
  } catch (e: any) {
    const context = { key: [e.message] }
    next(
      new BadRequestError({
        code: 403,
        logging: false,
        message: 'INVALID_TOKEN',
        context,
      })
    )
  }
}
