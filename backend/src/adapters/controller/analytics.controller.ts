import { RequestHandler } from 'express'
import dashboard from '../../application/use_cases/analytics/dashboard'

const analyticsController = (
  interviewDbRepositoryInterface: any,
  interviewDbRepositoryImpl: any,
  authServiceInterface: any,
  authServiceImpl: any
) => {
  const authService = authServiceInterface(authServiceImpl())
  const interviewDbRepo = interviewDbRepositoryInterface(
    interviewDbRepositoryImpl()
  )
  const getDashboardAnalytics: RequestHandler = async (req, res, next) => {
    try {
      const token = req.headers['x-access-token']
      const data = await dashboard(token, authService, interviewDbRepo)
      if (data instanceof Error) throw data
      return res.status(200).send({ success: true, data, error: null })
    } catch (e) {
      next(e)
    }
  }

  return { getDashboardAnalytics }
}

export default analyticsController
