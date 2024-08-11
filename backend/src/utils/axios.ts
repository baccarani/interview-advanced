import {
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponseHeaders,
  ResponseType,
} from 'axios'

export const postRequest = (
  axios: AxiosInstance,
  url: string,
  data: any,
  responseType?: ResponseType,
  headers?: AxiosRequestHeaders
) => {
  return axios.request({ method: 'POST', data, headers, url, responseType })
}

export const getRequest = (
  axios: AxiosInstance,
  url: string,
  headers: AxiosRequestHeaders
) => {
  return axios.request({ method: 'GET', headers, url })
}
