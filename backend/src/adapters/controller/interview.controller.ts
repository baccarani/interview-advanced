import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import findAll from '../../application/use_cases/interview/findAll'
import add from '../../application/use_cases/interview/add'
import countAll from '../../application/use_cases/interview/countAll'
import findById from '../../application/use_cases/interview/findById'
import deleteById from '../../application/use_cases/interview/deleteById'

const interviewController = (
  interviewDbRepositoryInterface: any,
  interviewDbRepositoryImpl: any,
  authServiceInterface: any,
  authServiceImpl: any
) => {
  const authService = authServiceInterface(authServiceImpl())
  const interviewDbRepo = interviewDbRepositoryInterface(
    interviewDbRepositoryImpl()
  )
  const addNewInterview: RequestHandler = async (req, res, next) => {
    try {
      const token = req.headers['x-access-token']
      const data = await add(token, authService, interviewDbRepo, req.body)
      if (data instanceof Error) throw data
      return res.status(200).send({ success: true, data, error: null })
    } catch (e) {
      next(e)
    }
  }
  const getAllInterviews: RequestHandler = async (req, res, next) => {
    try {
      const token = req.headers['x-access-token'] ?? ''

      const interviews = await findAll(
        token,
        authService,
        interviewDbRepo,
        req.query
      )
      const totalCount = await countAll(
        token,
        authService,
        interviewDbRepo,
        req.query
      )
      if (interviews instanceof Error) throw interviews
      if (totalCount instanceof Error) throw totalCount
      return res
        .status(200)
        .send({ success: true, data: { interviews, totalCount }, error: null })
    } catch (e) {
      next(e)
    }
  }
  const getInterviewById: RequestHandler = async (req, res, next) => {
    try {
      const resp = await findById(interviewDbRepo, req.params.id)
      if (resp instanceof Error) throw resp
      return res.status(200).send({ success: true, data: resp, error: null })
    } catch (e) {
      next(e)
    }
  }
  const deleteInterviewById: RequestHandler = async (req, res, next) => {
    try {
      const id = req.params.id
      const resp = await deleteById(interviewDbRepo, id)
      if (resp instanceof Error) throw resp
      return res
        .status(StatusCodes.OK)
        .send({ success: true, data: resp, error: null })
    } catch (e) {
      next(e)
    }
  }
  const updateInterviewById: RequestHandler = async (req, res, next) => {}

  return {
    addNewInterview,
    getAllInterviews,
    getInterviewById,
    deleteInterviewById,
    updateInterviewById,
  }
}

export default interviewController
