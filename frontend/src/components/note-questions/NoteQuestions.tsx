import { useState } from 'react'
import { Card } from '../../components/ui/card'
import { Textarea } from '../../components/ui/textarea'
import { Button, buttonVariants } from '@/components/ui/button'
import { Skeleton } from '../ui/skeleton'
import { useInterview } from '@/context/InterviewFlowProvider'
import { useAxiosPrivate } from '@/api/hooks_common/useAxiosPrivate'
import Multistar from '../../assets/multistar.png'
import React from 'react'

interface NoteQuestionsProps {
  questions: Array<{ role: string; content: string }>
}

const NoteQuestions = ({ questions }: NoteQuestionsProps) => {
  const { state } = useInterview()
  const api = useAxiosPrivate()
  const { interviewInformation, roleInformation } = state
  const [loadingGenerateButtons, setLoadingGenerateButtons] = useState<
    boolean[]
  >(
    new Array(
      interviewInformation.interviewData?.interviewOptions.questionCount
    ).fill(false)
  )
  const [loadingAnalyzeButtons, setLoadingAnalyzeButtons] = useState<boolean[]>(
    new Array(
      interviewInformation.interviewData?.interviewOptions.questionCount
    ).fill(false)
  )
  const [feedbacks, setFeedbacks] = useState<string[]>(
    new Array(
      interviewInformation.interviewData?.interviewOptions.questionCount
    ).fill('')
  )
  const [note, setNote] = useState<Array<string>>(
    Array(
      interviewInformation.interviewData?.interviewOptions.questionCount
    ).fill('')
  )

  const [localLoading, setLocalLoading] = useState<Array<boolean>>(
    Array(
      interviewInformation.interviewData?.interviewOptions.questionCount
    ).fill(false)
  )

  const [reviews, setReviews] = useState<Array<boolean>>(
    Array(
      interviewInformation.interviewData?.interviewOptions.questionCount
    ).fill(false)
  )

  const handleViewSampleAnswer = async (index: number) => {
    setLocalLoading((prev) => {
      let newStates = [...prev]
      newStates[index] = true
      return newStates
    })
    const newLoadingGenerateButtons = [...loadingGenerateButtons]
    newLoadingGenerateButtons[index] = true
    setLoadingGenerateButtons(newLoadingGenerateButtons)
    const question = questions[index].content

    try {
      const response = await api.request({
        url: '/ai/completions/notes/answers',
        method: 'post',
        data: { question, role: roleInformation.roleName },
      })
      const responseString = response.data.data
      setNote((prev) => {
        let newNote = [...prev]
        newNote[index] = responseString
        return newNote
      })
    } catch (error) {
      console.error('Error generating response:', error)
    } finally {
      newLoadingGenerateButtons[index] = false
      setLoadingGenerateButtons(newLoadingGenerateButtons)
      setLocalLoading((prev) => {
        let newStates = [...prev]
        newStates[index] = false
        return newStates
      })
    }
  }

  // Button to review the written answer, to the interview question, that was provided by the user.
  const handleReviewAnswer = async (index: number) => {
    setReviews((prev) => {
      let newStates = [...prev]
      newStates[index] = true
      return newStates
    })
    const newLoadingAnalyzeButtons = [...loadingAnalyzeButtons]
    newLoadingAnalyzeButtons[index] = true
    setLoadingAnalyzeButtons(newLoadingAnalyzeButtons)

    const question = questions[index].content
    const answer = note[index]

    try {
      const response = await api.request({
        url: '/ai/completions/notes/review',
        method: 'post',
        data: { question, answer },
      })
      const feedbackString = response.data.data
      const newFeedbacks = [...feedbacks]
      newFeedbacks[index] = feedbackString
      setFeedbacks(newFeedbacks)
    } catch (error) {
      console.error('Error generating response:', error)
    } finally {
      newLoadingAnalyzeButtons[index] = false
      setLoadingAnalyzeButtons(newLoadingAnalyzeButtons)
      setReviews((prev) => {
        let newStates = [...prev]
        newStates[index] = false
        return newStates
      })
    }
  }

  return (
    <>
      {questions && questions.length > 0 ? (
        questions.map((question, index) => (
          <Card key={index} className='p-4 mb-6 border-none'>
            <div className='mb-4'>
              <p className='font-light tracking-wide'>
                <span className='font-semibold'>Question {index + 1}:</span>{' '}
                {question.content}
              </p>
            </div>

            <Textarea
              value={note[index]}
              onChange={(e) => {
                setNote((prev) => {
                  let newChanges = [...prev]
                  newChanges[index] = e.target.value
                  return newChanges
                })
              }}
              className='mb-2 h-52'
              placeholder='Jot down your notes here and answer with the mic.'
            />

            {feedbacks[index] ? (
              <div className='my-4'>
                <h3 className='font-semibold mb-2'>Feedback:</h3>
                <p>{feedbacks[index]}</p>
              </div>
            ) : null}

            <div className='flex flex-wrap flex-col'>
              <Button
                className={`${buttonVariants({
                  variant: 'secondary',
                })} mt-2 w-full lg:w-auto mb-4`}
                onClick={() => handleViewSampleAnswer(index)}
                disabled={localLoading[index] || reviews[index]}
              >
                <div className='flex items-center'>
                  <img
                    src={Multistar}
                    alt='Star'
                    className='flex-shrink-0 h-5 w-5 mr-2'
                  />
                  {loadingGenerateButtons[index]
                    ? 'Generating Sample Answer...'
                    : 'View Sample Answer'}
                </div>
              </Button>

              <Button
                className={`${buttonVariants({
                  variant: 'outline',
                })} w-full sm:w-auto`}
                onClick={() => handleReviewAnswer(index)}
                disabled={reviews[index] || localLoading[index]}
              >
                <div className='flex items-center'>
                  <img
                    src={Multistar}
                    alt='Star'
                    className='flex-shrink-0 h-5 w-5 mr-2'
                  />
                  {reviews[index] ? 'Reviewing Answer...' : 'Review Answer'}
                </div>
              </Button>
            </div>
          </Card>
        ))
      ) : (
        <div>
          {Array(
            interviewInformation.interviewData?.interviewOptions.questionCount
          )
            .fill('')
            .map((_, index) => {
              return (
                <>
                  <React.Fragment key={index}>
                    <Skeleton className='w-full h-[390px]' />
                    <br />
                  </React.Fragment>
                </>
              )
            })}
        </div>
      )}
    </>
  )
}

export default NoteQuestions
