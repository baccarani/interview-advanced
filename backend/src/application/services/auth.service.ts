const authService = (service: any) => {
  // Verify Token
  const verifyToken = (token: string) => service.verifyToken(token)

  // Generate Token
  const generateToken = (payload: any, expiresIn: any) =>
    service.generateToken(payload, expiresIn)

  // Decode Token
  const decodeToken = (token: string) => service.decodeToken(token)

  return { verifyToken, generateToken, decodeToken }
}

export default authService
