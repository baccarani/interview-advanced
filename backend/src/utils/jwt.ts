import jwt from 'jsonwebtoken'
import { jwtConfig } from '../config/app.config'

interface Payload {
  iss?: string
  sub?: string
  role?: string
}

export const generateJWT = (
  data: Payload,
  validity: number | string = 0
): string => {
  return jwt.sign(data, jwtConfig.secret, {
    expiresIn: validity === 0 ? jwtConfig.maxAge : validity,
  })
}

export const verifyToken = (token: any): jwt.JwtPayload => {
  return <jwt.JwtPayload>jwt.verify(token, jwtConfig.secret)
}

export const decodeToken = (token: string): jwt.JwtPayload | null => {
  return jwt.decode(token, { json: true })
}
