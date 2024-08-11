const silent = async ({
  token,
  authService,
  profileRepository,
}: {
  token: string
  authService: any
  profileRepository: any
}): Promise<{ newAccessToken: string } | Error> => {
  try {
    const payload = await authService.verifyToken(token)
    if (payload instanceof Error) throw payload
    const { sub } = payload
    const existingProfile = await profileRepository.findByParams({ sub })
    if (!existingProfile) throw new Error('Profile does not exists!')
    const newAccessToken = authService.generateToken(
      {
        sub,
        iss: 'http://localhost:3000/api/v1',
        role: 'user',
      },
      Math.floor((Date.now() / 1000) * (15 * 60))
    )
    return { newAccessToken }
  } catch (e: any) {
    return e
  }
}
export default silent
