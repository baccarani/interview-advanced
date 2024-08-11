import { useEffect, useRef, useState } from 'react'
import LoaderCustom from '@/commons/components/LoaderCustom'
import Chat from '@/components/chat/Chat'
import { useInterview } from '@/context/InterviewFlowProvider'
import IRRework from './interview-response/IRRework'
import { useProfile } from '@/context/ProfileProvider'
import { capitalize } from '@/utils/capitalize'
import { InterviewCompletion } from './interview-completion/InterviewCompletion'
import { useAuth } from '@/context/AuthProvider'
import { segregator, testFormatter } from './helpers/responseSegregator'
import { interviewTranscriptAPI } from '@/api/interview_transcripts.api'
import { useAxiosPrivate } from '@/api/hooks_common/useAxiosPrivate'
import { feedbackTranscriptAPI } from '@/api/feedback_transcript.api'
import { interviewAPI } from '@/api/interview.api'
import { useNavigate } from 'react-router-dom'
import { aiAPI } from '@/api/ai.api'

type Props = {
  messages: Array<{ role: string; content: string }>
  loading: boolean
}

const InterviewRework = ({ messages, loading }: Props) => {
  const { state, dispatch } = useInterview()
  const { profile } = useProfile()
  const { state: authState } = useAuth()
  const navigate = useNavigate()
  const [hasInterviewEnded, setHasInterviewEnded] = useState(false)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [recorderLoading, setRecorderLoading] = useState<boolean>(false)
  const { interviewInformation, roleInformation } = state
  const [localMessageList, setLocalMessageList] = useState<
    Array<{ role: string; content: string }>
  >([])
  const [feedbackArray, setFeedbackArray] = useState<Array<string>>([])
  const [messageIndex, setMessageIndex] = useState(0)
  const api = useAxiosPrivate()
  const micButtonRef = useRef<null | HTMLDivElement>(null)
  const [firstAnswerProvided, setFirstAnswerProvided] = useState(false)

  // scrolls the interview chat to the bottom when a new message is added
  useEffect(() => {
    if ((messageIndex > 1 || firstAnswerProvided) && micButtonRef.current) {
      setTimeout(() => {
        micButtonRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 0)
    }
  }, [localMessageList])

  const handleOnClick = async () => {
    if (authState.auth) {
      const controller = new AbortController()
      if (profile && roleInformation.roleName) {
        const interviewTranscriptResponse =
          await interviewTranscriptAPI.createInterviewTranscript(
            api,
            controller.signal,
            { user_id: profile.sub },
            {
              uuid: interviewInformation.interviewId ?? '',
              responseCollection: segregator(localMessageList),
            }
          )

        if (interviewTranscriptResponse instanceof Error)
          throw interviewTranscriptResponse

        const feedbackTranscriptResponse =
          await feedbackTranscriptAPI.createFeedbackTranscript(
            api,
            controller.signal,
            { user_id: profile.sub },
            {
              standardUsed: 'STAR',
              totalScoreAsPerStandardUsed: 5,
              feedbackEntries: testFormatter(feedbackArray),
            }
          )

        if (feedbackTranscriptResponse instanceof Error)
          throw feedbackTranscriptResponse

        const resp: any = await interviewAPI.createNewInterview(
          api,
          controller.signal,
          { user_id: profile.sub },
          {
            jobName: roleInformation.roleName,
            jobDescription: roleInformation.roleDescription,
            interviewState: 'completed',
            feedbackTranscript: feedbackTranscriptResponse.feedbackTranscript,
            interviewTranscript:
              interviewTranscriptResponse.interviewTranscript,
            averageScore: feedbackTranscriptResponse.overallSessionScore,
            numberOfQuestionsAsked:
              interviewInformation.interviewData?.interviewOptions
                .questionCount || 3,
            typeOfQuestionsAsked:
              interviewInformation.interviewData?.interviewOptions
                .questionType || 'mixed',
            difficultyOfQuestionsAsked:
              interviewInformation.interviewData?.interviewOptions
                .questionDifficulty || 'medium',
          }
        )
        dispatch({ type: 'reset_flow', payload: null })
        navigate(`/interviews/${resp._id}/result`)
      } else {
        console.log('issue saving interview')
      }
    } else {
      const localInstance = JSON.parse(localStorage.getItem('data') ?? '')
      if (!localInstance) {
        localStorage.setItem('data', JSON.stringify([]))
      } else {
        localInstance.push('')
        localStorage.setItem('data', localInstance)
      }
    }
  }

  const generateFeedback = async (input: string): Promise<string | null> => {
    setRecorderLoading(true)
    const question = messages[messageIndex - 1].content
    const answer = input

    try {
      const resp = await api.request({
        url: '/ai/completions/feedback',
        method: 'post',
        data: { question, answer },
      })
      return resp.data.data
    } catch (e) {
      return null
    } finally {
      setRecorderLoading(false)
    }
  }

  const processSpeechToText = async (blob: Blob) => {
    setRecorderLoading(true)
    try {
      const controller = new AbortController()
      const formData = new FormData()
      formData.append('audio', blob, `default.mp3`)
      const response = await aiAPI.speechToText(
        api,
        controller.signal,
        formData
      )
      return response.data.data
    } catch (e) {
      return null
    } finally {
      setRecorderLoading(false)
    }
  }

  useEffect(() => {
    if (messages && localMessageList.length === 0) {
      setLoading(true)
      const initialMessage = {
        role: 'assistant',
        content:
          `Hello${
            profile ? ' ' + capitalize(profile.name) : ''
          }, thank you for taking the time to discuss your candidacy for the ` +
          roleInformation.roleName +
          ' role with us today. ' +
          messages[0].content,
      }
      setMessageIndex((prev) => prev + 1)
      setLocalMessageList((prev) => [...prev, initialMessage])
      setLoading(false)
    }
  }, [messages])

  const addMessage = async (blob: Blob) => {
    setLoading(true)
    try {
      const message: string | null = await processSpeechToText(blob)
      if (!message)
        throw new Error(
          `Sorry, We couldn't translate your response! Please Try again.`
        )
      setLocalMessageList((prev) => [
        ...prev,
        { role: 'user', content: message },
      ])
      if (messageIndex === 1) {
        setFirstAnswerProvided(true)
      }
      const feedback = await generateFeedback(message)
      if (!feedback) throw new Error('Error in feedback gen')
      setFeedbackArray((prev) => [...prev, feedback])
      if (messageIndex === messages.length) {
        setLocalMessageList((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              'Thank you for taking the time to interview with us. We have finished assessing your interview responses. You may now see your results to learn more.',
          },
        ])
        setHasInterviewEnded(true)
      } else {
        setLocalMessageList((prev) => [...prev, messages[messageIndex]])
        setMessageIndex((prev) => prev + 1)
      }
    } catch (e: Error | any) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {messages && messages.length > 0 ? (
        <>
          <Chat messages={localMessageList} loading={isLoading} />
          {loading ? (
            <LoaderCustom />
          ) : (
            <>
              {hasInterviewEnded ? (
                <InterviewCompletion
                  isAuth={authState.auth}
                  handleClick={handleOnClick}
                />
              ) : (
                <div ref={micButtonRef}>
                  <IRRework
                    addMessage={addMessage}
                    recorderLoading={recorderLoading}
                  />
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <LoaderCustom />
      )}
    </div>
  )
}
export default InterviewRework
