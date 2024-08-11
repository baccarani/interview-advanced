const tokenRefresh = async ({
  accessToken,
  refreshToken,
  authService,
  profileRepository,
}: {
  accessToken: any
  refreshToken: any
  authService: any
  profileRepository: any
}): Promise<{ accessToken: string } | Error> => {
  try {
    const decodedRefreshToken = await authService.verifyToken(refreshToken)

    if (decodedRefreshToken instanceof Error) throw decodedRefreshToken

    const { sub } = decodedRefreshToken

    const existingProfile = await profileRepository.findById(sub)

    if (!existingProfile) throw new Error('User Does not Exists!')

    const newAccessToken = await authService.generateToken(
      {
        iss: 'http://localhost:3000/api/v1',
        role: 'user',
        sub: sub,
      },
      Math.floor((Date.now() / 1000) * (15 * 60))
    )
    return { accessToken: newAccessToken }
  } catch (e: any) {
    return e
  }
}

export default tokenRefresh
