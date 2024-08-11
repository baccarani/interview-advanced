import axios, { AxiosError, GenericAbortSignal } from 'axios'

export const makeAPICall = async (
  url: string,
  data: any,
  cancel: GenericAbortSignal
): Promise<any | Error> => {
  try {
    const resp = await axios.request({
      method: 'POST',
      url,
      data,
      signal: cancel,
    })
    return resp
  } catch (e: any) {
    if (e instanceof AxiosError) {
      console.log('here')
    }
    return e
  }
}
