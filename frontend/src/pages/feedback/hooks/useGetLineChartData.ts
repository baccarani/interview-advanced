import { useEffect, useState } from 'react'
import { useAxiosPrivate } from '@/api/hooks_common/useAxiosPrivate'
import { useProfile } from '@/context/ProfileProvider'
import { chartApi } from '@/api/charts.api'

interface UseGetInterviewByIdProps {
  data: any
  loading: boolean
  error: any
}

export const useGetLineChartData = (id: string): UseGetInterviewByIdProps => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)
  const [data, setData] = useState<any>(null)

  const { profile } = useProfile()
  const api = useAxiosPrivate()

  useEffect(() => {
    if (!id || !profile) return

    const controller = new AbortController()

    const fetchData = async () => {
      try {
        const response = await chartApi.getLineChartResult(
          api,
          controller.signal,
          {
            user_id: profile.sub || '',
          },
          { interview_id: id }
        )

        if (response instanceof Error) {
          throw response
        }

        setData(response)
      } catch (e) {
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
  }, [api, id, profile])

  return { data, loading, error }
}
