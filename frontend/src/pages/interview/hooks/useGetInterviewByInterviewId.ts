import { useAxiosPrivate } from '@/api/hooks_common/useAxiosPrivate'
import { interviewTranscriptAPI } from '@/api/interview_transcripts.api'
import { useProfile } from '@/context/ProfileProvider'
import { useEffect, useState } from 'react'

export const useGetInterviewTranscriptById = (interview_id: string) => {
  const controller = new AbortController()
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<Error | null>(null)
  const privateAxios = useAxiosPrivate()
  const { profile } = useProfile()

  useEffect(() => {
    interviewTranscriptAPI
      .getInterviewTranscriptById(privateAxios, controller.signal, {
        user_id: profile?.sub || '',
        interview_id,
      })
      .then((data) => {
        setData(data)
        setLoading(false)
      })
      .catch((e) => setError(e))
    return () => {
      controller.abort()
    }
  }, [])
  return { data, loading, error }
}
