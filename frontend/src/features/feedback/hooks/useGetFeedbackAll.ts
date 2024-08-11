import { feedbackAPI } from '@/api/feedback.api'
import { useAxiosPrivate } from '@/api/hooks_common/useAxiosPrivate'
import { useEffect, useState } from 'react'

export const useGetFeedbackAll = () => {
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const api = useAxiosPrivate()
  useEffect(() => {
    let isMounted = true
    const abortSignal = new AbortController()
    feedbackAPI
      .getFeedbackAll(api, abortSignal.signal)
      .then((data) => {
        isMounted && setData(data)
        setIsLoading(false)
      })
      .catch((e) => setError(e))
    return () => {
      isMounted = false
      abortSignal.abort()
    }
  }, [])

  return { data, isLoading, error }
}
