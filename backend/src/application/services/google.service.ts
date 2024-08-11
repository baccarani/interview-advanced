const googleService = (service: any) => {
  const googleOAuthTokenVerify = async (token: string) =>
    await service.googleOAuthTokenVerify(token)

  const googleOAuthTokenFetch = async (token: string) =>
    await service.googleOAuthTokenFetch(token)

  return { googleOAuthTokenFetch, googleOAuthTokenVerify }
}

export default googleService
