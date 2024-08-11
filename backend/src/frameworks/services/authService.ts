import jwt from 'jsonwebtoken'
import config from '../../config/config'

const authService = () => {
  // Verify Token
  const verifyToken = (token: string) => jwt.verify(token, config.jwtSecret)

  // Generate Token
  const generateToken = (payload: any, expiresIn: string) =>
    jwt.sign(payload, config.jwtSecret, { expiresIn })

  // Decode Token
  const decodeToken = (token: string) => jwt.decode(token)

  return { verifyToken, generateToken, decodeToken }
}

export default authService
