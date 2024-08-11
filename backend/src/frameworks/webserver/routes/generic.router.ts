import { NextFunction, RequestHandler, Response } from 'express'

export default (express: any) => {
  const router = express.Router({ strict: true })

  // Ping Route
  router.get('/ping', (req: Request, res: Response, next: NextFunction) =>
    res.sendStatus(200)
  )

  // Health Check Route
  router.get('/health', (req: Request, res: Response, next: NextFunction) =>
    res.sendStatus(200)
  )

  return router
}
