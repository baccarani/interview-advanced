const findById = async (
  token: any,
  profileRespository: any,
  authService: any
) => {
  const { sub } = authService.verifyToken(token)
  return profileRespository.findById(sub)
}

export default findById
