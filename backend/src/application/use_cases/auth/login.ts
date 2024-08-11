import { TokenPayload } from 'google-auth-library'
import { GetTokenResponse } from 'google-auth-library/build/src/auth/oauth2client'
import profile from '../../../entity/profile.entity'
import interviewQuota from '../../../entity/interviewQuota.entity'

const login = async ({
  incommingToken,
  authService,
  profileRepository,
  interviewQuotaRepository,
  googleAuthService,
}: {
  incommingToken: any
  authService: any
  profileRepository: any
  googleAuthService: any
  interviewQuotaRepository: any
}): Promise<{ refreshToken: string; accessToken: string }> => {
  try {
    if (!incommingToken) {
      const error = new Error('Token cannont be empty')
      throw error
    }

    const { tokens }: GetTokenResponse =
      await googleAuthService.googleOAuthTokenFetch(
        incommingToken ?? 'MISSING_CRED_TOKEN'
      )

    const payload: TokenPayload | Error =
      await googleAuthService.googleOAuthTokenVerify(
        tokens.id_token ?? 'MISSING_CRED_TOKEN'
      )
    if (payload instanceof Error) throw payload

    const { name, email, sub, picture } = payload

    const existingProfile = await profileRepository.findByParams({ sub })

    const refreshToken = authService.generateToken(
      {
        iss: 'http://localhost:3000/api/v1',
        sub,
        role: 'user',
      },
      Math.floor((Date.now() / 1000) * (2 * 60 * 60 * 24))
    )

    const accessToken = authService.generateToken(
      {
        iss: 'http://localhost:3000/api/v1/',
        sub,
        role: 'user',
      },
      Math.floor((Date.now() / 1000) * (15 * 60))
    )

    if (!existingProfile) {
      const newProfile = profile({ name, email, picture, sub })
      const newQuota = interviewQuota({
        sub,
        availableInterviews: 3,
        usedInterviews: 0,
      })
      const profileResp = await profileRepository.add(newProfile)
      if (profileResp instanceof Error) throw profileResp
      const quotaResp = await interviewQuotaRepository.add(newQuota)
      if (quotaResp instanceof Error) throw profileResp
    }

    return { refreshToken, accessToken }
  } catch (e: any) {
    console.log(e)
    return { refreshToken: '', accessToken: '' }
  }
}

export default login
