import { useEffect, useState } from 'react'
import { useAxiosPrivate } from '@/api/hooks_common/useAxiosPrivate'
import { interviewAPI } from '@/api/interview.api'
import { useProfile } from '@/context/ProfileProvider'
import { InterviewData } from '@/api/types/jobs.types'

export const useGetInterviewsByUserId = (
  page: number = 1,
  sort: string = '_id',
  order: string = 'asc',
  userQuery: string = ''
) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState<{
    interviews: Array<InterviewData>
    totalCount: number
  } | null>(null)

  const { profile } = useProfile()
  const api = useAxiosPrivate()

  useEffect(() => {
    const controller = new AbortController()
    interviewAPI
      .getInterviewByUserId(
        api,
        controller.signal,
        {
          user_id: profile?.sub || '',
        },
        { page, userQuery }
      )
      .then((response: any) => {
        if (response.error) {
          throw response.error
        }
        setData(response.data)
      })
      .catch((e: any) => {
        setError(e)
      })
      .finally(() => {
        setLoading(false)
      })

    return () => {
      controller.abort()
    }
  }, [page, sort, order, userQuery])
  return { data, loading, error }
}
