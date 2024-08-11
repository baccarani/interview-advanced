const devLogin = async (authService: any) => {
  return {
    token: authService.generateToken(
      {
        iss: 'http://localhost:3000/api/v1',
        role: 'user',
        sub: '102683875506239003993',
      },
      Math.floor((Date.now() / 1000) * (2 * 60 * 60 * 24))
    ),
    sub: '102683875506239003993',
  }
}

export default devLogin
