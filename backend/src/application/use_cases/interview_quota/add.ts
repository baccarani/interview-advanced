import interviewQuota from '../../../entity/interviewQuota.entity'

export default async (
  token: any,
  authService: any,
  interviewQuotaRepository: any
) => {
  try {
    const payload = await authService.decodedToken(token)
    if (payload instanceof Error) throw payload
    const { sub }: { sub: string } = payload
    const quota = interviewQuota({
      sub,
      availableInterviews: 3,
      usedInterviews: 0,
    })
    return await interviewQuotaRepository.add(quota)
  } catch (e) {
    return e
  }
}
