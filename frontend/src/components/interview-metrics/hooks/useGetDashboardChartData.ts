import { chartApi } from '@/api/charts.api'
import { useAxiosPrivate } from '@/api/hooks_common/useAxiosPrivate'
import { useProfile } from '@/context/ProfileProvider'
import { useEffect, useState } from 'react'

export const useGetDashboardChartData = (renderTrigger: boolean) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<any>(null)
  const api = useAxiosPrivate()
  const { profile } = useProfile()

  useEffect(() => {
    const controller = new AbortController()
    const fetchData = async () => {
      try {
        const response = await chartApi.getChartDataDashboard(
          api,
          controller.signal,
          {
            user_id: profile?.sub || 'missing_role',
          },
          { range: 5 }
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
  }, [renderTrigger])
  return { loading, error, data }
}
