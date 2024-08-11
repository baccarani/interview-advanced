import axios, { GenericAbortSignal } from 'axios'
import { useEffect, useState } from 'react'
import { formatDataReceivedFromAPI } from '../helpers/dataFormatter'
import { useAxiosPrivate } from '@/api/hooks_common/useAxiosPrivate'
import { aiAPI } from '@/api/ai.api'
import { useInterview } from '@/context/InterviewFlowProvider'

export const useGenerateInterviewQuestions = () => {
  const [data, setData] = useState<any>(null)
  const { state } = useInterview()
  const { roleInformation, interviewInformation } = state

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const api = useAxiosPrivate()

  const fetchData = async (signal: GenericAbortSignal) => {
    try {
      setLoading(true)
      const resp = await aiAPI.generateQuestions(api, signal, {
        roleInformation,
        interviewInformation,
      })
      const formattedDataAfterAPICall = formatDataReceivedFromAPI(
        resp.data.data.split(';').map((question: string) => question.trim())
      )

      setData(formattedDataAfterAPICall)
    } catch (e: Error | any) {
      if (axios.isCancel(e)) console.log('Request Cancelled')
      else {
        setError(e)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const controller = new AbortController()
    fetchData(controller.signal)
    return () => {
      controller.abort()
    }
  }, [])

  return { data, error, loading }
}
