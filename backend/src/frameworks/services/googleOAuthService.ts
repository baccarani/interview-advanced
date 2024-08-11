import { GetTokenResponse } from 'google-auth-library/build/src/auth/oauth2client'
import { OAuth2Client, TokenPayload } from 'google-auth-library'
import config from '../../config/config'

const googleAuthService = () => {
  const client: OAuth2Client = new OAuth2Client({
    clientId: config.google.clientId,
    clientSecret: config.google.clientSecret,
    redirectUri: 'postmessage',
  })

  const googleOAuthTokenVerify = async (
    token: string
  ): Promise<TokenPayload | any> => {
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: config.google.clientId,
      })
      return ticket.getPayload()
    } catch (e) {
      return e
    }
  }

  const googleOAuthTokenFetch = async (
    code: string
  ): Promise<GetTokenResponse> => {
    return await client.getToken(code)
  }

  return { googleOAuthTokenFetch, googleOAuthTokenVerify }
}

export default googleAuthService
