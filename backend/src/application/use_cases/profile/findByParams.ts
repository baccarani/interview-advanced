const findByParams = async (
  token: any,
  profileRespository: any,
  authService: any
) => {
  const { sub } = await authService.verifyToken(token)
  return await profileRespository.findByParams({ sub })
}

export default findByParams
