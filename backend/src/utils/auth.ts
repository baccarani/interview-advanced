export const extractAuthHeader = (headers: any) => {
  return headers['x-access-token']
}
