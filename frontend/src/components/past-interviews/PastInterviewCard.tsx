import { InterviewData } from '@/api/types/interview.types'
import { Button } from '../ui/button'
import { Card, CardTitle } from '../ui/card'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, CircleEllipsis } from 'lucide-react'
import { interviewAPI } from '@/api/interview.api'
import { useAxiosPrivate } from '@/api/hooks_common/useAxiosPrivate'
import { useProfile } from '@/context/ProfileProvider'
import { PastInterviewDeletePopup } from './PastInterviewDeletePopup'

type Props = {
  interview: InterviewData
  setRenderTrigger?: React.Dispatch<React.SetStateAction<boolean>>
  showToast: (type: 'success' | 'error', message: string) => void
}

export const PastInterviewCard = ({
  interview,
  setRenderTrigger,
  showToast,
}: Props) => {
  const navigate = useNavigate()
  const api = useAxiosPrivate()
  const { profile } = useProfile()

  const navigateToFeedBack = (id: string) => {
    navigate(`/interviews/${id}/result`)
  }

  const handleYesClick = async (id: string) => {
    try {
      const controller = new AbortController()
      const resp = await interviewAPI.deleteInterviewById(
        api,
        controller.signal,
        { user_id: profile?.sub || 'missing_sub', interview_id: id }
      )
      if (resp instanceof Error) throw resp
      showToast('success', 'Your interview has successfully been deleted.')
      setRenderTrigger && setRenderTrigger((prev) => !prev)
    } catch (e: any) {
      showToast('error', `Deletion Failure - ${e.message}`)
    }
  }

  return (
    <Card
      className='p-5 bg-transparent w-full h-auto flex flex-col'
      key={interview._id}
    >
      <div className='mb-4'>
        <div className='flex justify-between items-start mb-4'>
          <CardTitle className='overflow-hidden line-clamp-2 text-xl h-[3.5rem]'>
            {interview.jobName}
          </CardTitle>
          <div
            className='flex-shrink-0'
            title={
              interview.interviewState === 'completed'
                ? 'Completed'
                : 'In-Progress'
            }
          >
            {interview.interviewState === 'completed' ? (
              <CheckCircle className='text-green-500' />
            ) : (
              <CircleEllipsis />
            )}
          </div>
        </div>

        <div className='flex mb-6 flex-wrap'>
          <Badge variant='outline' className='mr-2 mb-4 whitespace-nowrap'>
            {new Date(interview.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Badge>
          <Badge variant='outline' className='mr-2 mb-4 whitespace-nowrap'>
            {interview.difficultyOfQuestionsAsked}
          </Badge>
          <Badge variant='outline' className='mr-2 mb-4 whitespace-nowrap'>
            {interview.numberOfQuestionsAsked} Questions
          </Badge>
          <Badge variant='outline' className='mb-4 whitespace-nowrap'>{interview.typeOfQuestionsAsked}</Badge>
        </div>

        <p className='text-sm font-semibold flex items-end mt-4'>
          <span className='text-xl'>{interview.averageScore} / 5</span>
          <span className='ml-1.5'>Average Score</span>
        </p>
      </div>
      {interview.interviewState === 'in-progress' ? (
        <Button>Continue Interview</Button>
      ) : (
        <div className='flex space-x-2'>
          <Button
            variant={'default'}
            className='flex-grow'
            onClick={() => navigateToFeedBack(interview._id)}
          >
            View Results
          </Button>

          <PastInterviewDeletePopup
            _id={interview._id}
            handleClick={handleYesClick}
          />
        </div>
      )}
    </Card>
  )
}
