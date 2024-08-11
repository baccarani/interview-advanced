import { useEffect, useState } from 'react'
import { useAxiosPrivate } from '@/api/hooks_common/useAxiosPrivate'
import { interviewAPI } from '@/api/interview.api'
import { useProfile } from '@/context/ProfileProvider'
import { InterviewData } from '@/api/types/interview.types'

interface UseGetInterviewsByUserIdProps {
  data: { interviews: Array<InterviewData>; totalCount: number } | null
  loading: boolean
  error: any
}

export const useGetInterviewsByUserId = (
  page: number = 1,
  userQuery: string = '',
  renderTrigger?: boolean
): UseGetInterviewsByUserIdProps => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)
  const [data, setData] = useState<{
    interviews: Array<InterviewData>
    totalCount: number
  } | null>(null)

  const { profile } = useProfile()
  const api = useAxiosPrivate()

  useEffect(() => {
    if (!profile) return

    const controller = new AbortController()
    const fetchData = async () => {
      try {
        const response = await interviewAPI.getInterviewByUserId(
          api,
          controller.signal,
          {
            user_id: profile.sub || '',
          },
          { page, userQuery }
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

    return () => {
      controller.abort()
    }
  }, [page, userQuery, api, profile, renderTrigger])

  return { data, loading, error }
}
