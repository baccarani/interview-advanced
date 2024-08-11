import { useEffect, useState } from 'react'
import { useAxiosPrivate } from '@/api/hooks_common/useAxiosPrivate'
import { interviewAPI } from '@/api/interview.api'
import { useProfile } from '@/context/ProfileProvider'
import { InterviewAnalytics } from '@/api/types/interview.types'

export const useGetLandingAnalytics = (renderTrigger?: boolean) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState<InterviewAnalytics | null>(null)

  const { profile } = useProfile()
  const api = useAxiosPrivate()

  useEffect(() => {
    const controller = new AbortController()
    const fetchData = async () => {
      try {
        const response = await interviewAPI.getInterviewAnalytics(
          api,
          controller.signal,
          {
            user_id: profile?.sub || '',
          }
        )

        if (response instanceof Error) {
          throw response
        }

        setData(response)
      } catch (e: any) {
        if (!controller.signal.aborted) {
          setError(e)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => controller.abort()
  }, [renderTrigger])
  return { data, loading, error }
}
