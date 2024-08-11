import { useEffect } from 'react'
import { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { useAuth } from '@/context/AuthProvider'

import { api } from '../config/axiosConfig'
import { useRefresh } from '../../features/auth/hooks/useRefresh'

type RetryQueueItem = {
  resolve: (value: any) => void
  reject: (value: any) => void
  config: any
}

const refreshAndRetryQueue: RetryQueueItem[] = []
let isRefreshing = false

export const useAxiosPrivate = (): AxiosInstance => {
  const refresh = useRefresh()
  const { state } = useAuth()

  useEffect(() => {
    const requestIntercept: number = api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (!config.headers['x-access-token']) {
          config.headers['x-access-token'] = `${state.token}`
        }
        return config
      }
    )

    const responseIntercept: number = api.interceptors.response.use(
      (resp: AxiosResponse) => resp,
      async (err: any) => {
        const originalRequest = err.config
        if (err.response?.status === 403) {
          if (!isRefreshing) {
            isRefreshing = true
            try {
              const accessToken = await refresh()
              refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
                config.headers['Authorization'] = `Bearer ${accessToken}`
                api(config)
                  .then((response) => resolve(response))
                  .catch((err) => reject(err))
              })
              refreshAndRetryQueue.length = 0
              originalRequest.headers['Authorization'] = `Bearer ${accessToken}`
              return api(originalRequest)
            } catch (e) {
              console.log(e)
            } finally {
              isRefreshing = false
            }
          }
          return new Promise<void>((resolve, reject) => {
            refreshAndRetryQueue.push({
              config: originalRequest,
              reject,
              resolve,
            })
          })
        }

        return Promise.reject(err)
      }
    )
    return () => {
      api.interceptors.request.eject(requestIntercept)
      api.interceptors.response.eject(responseIntercept)
    }
  }, [state.token, refresh])

  return api
}
