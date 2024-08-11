import interviewQuota from '../../../entity/interviewQuota.entity'

export default async (
  token: any,
  authService: any,
  interviewQuoteRepository: any
) => {
  try {
    const payload = await authService.decodeToken(token)
    if (payload instanceof Error) throw payload
    const { sub } = payload
    const existingQuota: {
      sub: string
      availableInterviews: number
      usedInterviews: number
    } = await interviewQuoteRepository.findByParams({ sub })

    const updatedQuota = interviewQuota({
      availableInterviews: existingQuota.availableInterviews - 1,
      usedInterviews: existingQuota.usedInterviews + 1,
    })
    return await interviewQuoteRepository.updateByParams(sub, updatedQuota)
  } catch (e) {
    return e
  }
}
