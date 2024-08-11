import { queryValidator } from '../../../utils/queryValidator'

const findAll = async (
  token: any,
  authService: any,
  interviewRepository: any,
  query: any
) => {
  try {
    let {
      jobName = '',
      interviewState = '',
      order = 'desc',
      sort = '_id',
      page = '1',
    } = query as any

    const decodedToken = await authService.verifyToken(token)
    if (decodedToken instanceof Error) throw decodedToken
    const { sub } = decodedToken

    const { pageNum, sortObject }: any = queryValidator('interviews', {
      order,
      sort,
      page,
    })

    let params: {
      sub: string | undefined
      interviewState?: 'in-progress' | 'complete'
      jobName?: string
      page: number
      sortObject: any
      perPage: number
    } = { sub, page: pageNum, sortObject: sortObject, perPage: 4 }

    if (interviewState !== '') {
      params.interviewState = interviewState
    }

    if (jobName !== '') {
      params.jobName = jobName
    }

    const data = await interviewRepository.findAll(params)

    return data
  } catch (e) {
    return e
  }
}

export default findAll
