const profile = ({
  name,
  email,
  sub,
  picture,
}: {
  name: string | undefined
  email: string | undefined
  sub: string | undefined
  picture: string | undefined
}) => {
  return {
    getName: () => name,
    getEmail: () => email,
    getSub: () => sub,
    getPicture: () => picture,
  }
}

export default profile
