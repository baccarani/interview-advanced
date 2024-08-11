import { RequestHandler } from 'express'
import dashboard from '../../application/use_cases/charts/dashboard'
import result from '../../application/use_cases/charts/result'

const chartsController = (
  interviewDbRepositoryInterface: any,
  interviewDbRepositoryImpl: any,
  authServiceInterface: any,
  authServiceImpl: any
) => {
  const authService = authServiceInterface(authServiceImpl())
  const interviewDbRepo = interviewDbRepositoryInterface(
    interviewDbRepositoryImpl()
  )
  const getDashboardCharts: RequestHandler = async (req, res, next) => {
    try {
      const token = req.headers['x-access-token']
      const data = await dashboard(token, authService, interviewDbRepo)
      if (data instanceof Error) throw data
      return res.status(200).send({ success: true, data, error: null })
    } catch (e) {
      next(e)
    }
  }
  const getResultsCharts: RequestHandler = async (req, res, next) => {
    try {
      const id = req.query.interview_id
      const data = await result(id, interviewDbRepo)
      if (data instanceof Error) throw data
      return res.status(200).send({ success: true, data, error: null })
    } catch (e) {
      next(e)
    }
  }

  return { getDashboardCharts, getResultsCharts }
}

export default chartsController
