import { useEffect, useState } from 'react'
import { useAxiosPrivate } from '@/api/hooks_common/useAxiosPrivate'
import { useProfile } from '@/context/ProfileProvider'
import { feedbackTranscriptAPI } from '@/api/feedback_transcript.api'

export const useGetFeedbackById = (id: string) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState<any>(null)

  const { profile } = useProfile()
  const api = useAxiosPrivate()

  useEffect(() => {
    const controller = new AbortController()
    feedbackTranscriptAPI
      .getFeedbackTranscriptById(api, controller.signal, {
        user_id: profile?.sub || '',
        feedbackTranscript_id: id,
      })
      .then((response) => {
        if (response instanceof Error) throw response
        setData(response)
      })
      .catch((e) => {
        setError(e)
      })
      .finally(() => {
        setLoading(false)
      })

    return () => {
      controller.abort()
    }
  }, [])
  return { data, loading, error }
}
