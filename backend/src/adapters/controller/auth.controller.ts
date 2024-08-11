import { RequestHandler } from 'express'
import login from '../../application/use_cases/auth/login'
import silent from '../../application/use_cases/auth/silent'
import tokenRefresh from '../../application/use_cases/auth/refresh'
import devLogin from '../../application/use_cases/auth/devLogin'

const authController = (
  profileDBRepositoryInterface: any,
  profileDBRepositoryImpl: any,
  interviewQuoteDBRepositoryInterface: any,
  interviewQuotaDBRepositoryImpl: any,
  authServiceInterface: any,
  authServiceImpl: any,
  googleServiceInterface: any,
  googleServiceImpl: any
) => {
  const authService = authServiceInterface(authServiceImpl())
  const googleAuthService = googleServiceInterface(googleServiceImpl())
  const profileDBRepo = profileDBRepositoryInterface(profileDBRepositoryImpl())
  const interviewQuotaDBRepo = interviewQuoteDBRepositoryInterface(
    interviewQuotaDBRepositoryImpl()
  )

  const loginUser: RequestHandler = async (req, res, next) => {
    try {
      let token = req.query.token
      if (typeof token !== 'string') token = ''
      const { accessToken, refreshToken } = await login({
        incommingToken: token,
        authService,
        profileRepository: profileDBRepo,
        interviewQuotaRepository: interviewQuotaDBRepo,
        googleAuthService,
      })

      res.cookie('refresh', refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 48 * 60 * 60 * 1000,
        sameSite: 'none',
        signed: true,
      })
      return res
        .status(200)
        .send({ success: true, data: accessToken, error: null })
    } catch (e) {
      next(e)
    }
  }

  const silentLoginUser: RequestHandler = async (req, res, next) => {
    try {
      let incommingRefreshToken = req.signedCookies.refresh
      if (typeof incommingRefreshToken !== 'string') incommingRefreshToken = ''
      const resp = await silent({
        token: incommingRefreshToken,
        authService,
        profileRepository: profileDBRepo,
      })
      if (resp instanceof Error) throw resp
      return res.status(200).send({
        sucess: true,
        data: resp.newAccessToken,
        error: null,
      })
    } catch (e) {
      next(e)
    }
  }

  const tokenRefreshUser: RequestHandler = async (req, res, next) => {
    try {
      const incommingAccessToken = req.query.token
      const incommingRefreshToken = req.signedCookies.refresh
      const resp = await tokenRefresh({
        accessToken: incommingAccessToken,
        refreshToken: incommingRefreshToken,
        authService,
        profileRepository: profileDBRepo,
      })
      if (resp instanceof Error) throw resp
      const { accessToken } = resp
      return res
        .status(200)
        .send({ success: true, data: accessToken, error: null })
    } catch (e) {
      next(e)
    }
  }

  const logoutUser: RequestHandler = async (req, res, next) => {
    try {
      res.clearCookie('refresh')
      return res.status(200).send({ success: true, data: null, error: null })
    } catch (e) {
      next(e)
    }
  }

  const devLoginUser: RequestHandler = async (req, res, next) => {
    try {
      return res.status(200).send(await devLogin(authService))
    } catch (e) {
      next(e)
    }
  }

  return {
    loginUser,
    logoutUser,
    silentLoginUser,
    tokenRefreshUser,
    devLoginUser,
  }
}

export default authController
