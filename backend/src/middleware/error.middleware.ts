import { ErrorRequestHandler, RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'

// Invalid JWT Middleware
export const invalidJWTErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).send({
      success: false,
      data: null,
      error: {
        code: 401,
        message: 'INVALID_TOKEN',
        context: [{ key: 'Invalid JWT' }],
      },
    })
  }
  next(err)
}

// Invalid JSON Middleware
export const invalidJSONErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  if (err && err.status === 400 && 'body' in err) {
    console.error(err)
    return res.status(404).send({
      success: false,
      data: null,
      error: {
        code: 400,
        message: 'INVALID_JSON',
        context: [{ key: 'Invalid JSON' }],
      },
    })
  }
  next()
}

export const routeNotFoundErrorHandler: RequestHandler = (req, res, next) => {
  return res.sendStatus(StatusCodes.NOT_FOUND)
}

// Default Error Middelware
export const defaultErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  err.statusCode = err.statusCode || 404
  return err.customMessage || err.message
    ? res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.customMessage || err.message,
      })
    : res.status(err.statusCode).json({ status: err.statusCode, message: err })
}
