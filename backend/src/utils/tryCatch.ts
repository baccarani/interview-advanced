import { NextFunction, Request, Response } from 'express'

export const tryCatchWrapper: Function = (controllerFunc: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controllerFunc(req, res)
    } catch (e) {
      next(e)
    }
  }
}
