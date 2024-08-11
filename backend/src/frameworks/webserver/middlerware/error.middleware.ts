import { ErrorRequestHandler, RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'

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
  console.log(err?.response?.data)
  err.statusCode = err.statusCode || 404
  return err.customMessage || err.message
    ? res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.customMessage || err.message,
      })
    : res.status(err.statusCode).json({ status: err.statusCode, message: err })
}
