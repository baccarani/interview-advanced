import { Request, RequestHandler, Response } from 'express'
import findById from '../../application/use_cases/profile/findById'
import findByParams from '../../application/use_cases/profile/findByParams'
import { StatusCodes } from 'http-status-codes'

const profileController = (
  profileDbRepositoryInterface: any,
  profileDbRepositoryImpl: any,
  authServiceInterface: any,
  authServiceImpl: any
) => {
  const dbRespository = profileDbRepositoryInterface(profileDbRepositoryImpl())
  const authService = authServiceInterface(authServiceImpl())

  const fetchUsersById: RequestHandler = (req, res, next) => {
    const token = req.headers['x-access-token']
    findById(token, dbRespository, authService)
      .then((profile: any) =>
        res.status(200).send({ success: true, error: null, data: profile })
      )
      .catch((e: any) => next(e))
  }

  const fetchUserByParams = async (req: Request, res: Response) => {
    const token = req.headers['x-access-token']
    const data = await findByParams(token, dbRespository, authService)
    if (data instanceof Error) throw data
    return res.status(StatusCodes.OK).send({ success: true, data, error: null })
  }
  return { fetchUsersById, fetchUserByParams }
}

export default profileController
