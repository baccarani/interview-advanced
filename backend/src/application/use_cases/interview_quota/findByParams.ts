const findByParams = async (
  token: any,
  authService: any,
  interviewQuoteRepository: any
) => {
  try {
    const payload = await authService.decodeToken(token)
    if (payload instanceof Error) throw payload
    const { sub } = payload
    return await interviewQuoteRepository.findByParams({ sub })
  } catch (e) {
    return e
  }
}

export default findByParams
