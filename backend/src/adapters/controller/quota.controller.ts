import { Request, Response } from 'express'
import add from '../../application/use_cases/interview_quota/add'
import { StatusCodes } from 'http-status-codes'
import findByParams from '../../application/use_cases/interview_quota/findByParams'
import updateByParams from '../../application/use_cases/interview_quota/updateByParams'

export default (
  interviewQuotaRepositoryInterface: any,
  interviewQuotaRepositoryImpl: any,
  authServiceInterface: any,
  authServiceImpl: any
) => {
  const dbRespository = interviewQuotaRepositoryInterface(
    interviewQuotaRepositoryImpl()
  )
  const authService = authServiceInterface(authServiceImpl())

  const addNewQuota = async (req: Request, res: Response) => {
    const token = req.headers['x-access-token']
    const data = await add(token || '', authService, dbRespository)
    if (data instanceof Error) throw data
    return res.status(StatusCodes.OK).send({ success: true, data, error: null })
  }

  const findQuotaByParams = async (req: Request, res: Response) => {
    const token = req.headers['x-access-token']
    const data = await findByParams(token || '', authService, dbRespository)
    if (data instanceof Error) throw data
    return res.status(StatusCodes.OK).send({ success: true, data, error: null })
  }

  const updateQuotaByParams = async (req: Request, res: Response) => {
    const token = req.headers['x-access-token']
    const data = await updateByParams(token || '', authService, dbRespository)
    if (data instanceof Error) throw data
    return res.status(StatusCodes.OK).send({ success: true, data, error: null })
  }

  const validateUserQuota = async (req: Request, res: Response) => {
    const token = req.headers['x-access-token']
    const data = await findByParams(token, authService, dbRespository)
    if (data instanceof Error) throw data
    if (data.availableInterviews < 1)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ success: false, data: false, error: null })
    return res
      .status(StatusCodes.OK)
      .send({ success: true, data: true, error: null })
  }

  return {
    addNewQuota,
    findQuotaByParams,
    updateQuotaByParams,
    validateUserQuota,
  }
}
