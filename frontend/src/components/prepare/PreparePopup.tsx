import { useNavigate } from 'react-router-dom'
import { Button, buttonVariants } from '../ui/button'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { useInterview } from '@/context/InterviewFlowProvider'
// import { useAuth } from '@/context/AuthProvider'
// import { toast } from '../ui/use-toast'
// import { quotaAPI } from '@/api/quota.api'
// import { useAxiosPrivate } from '@/api/hooks_common/useAxiosPrivate'

const PreparePopup = () => {
  const { state, dispatch } = useInterview()
  // const { auth } = useAuth()
  // const api = useAxiosPrivate()
  const navigate = useNavigate()
  const { interviewInformation } = state
  const currentRole = localStorage.getItem('currentRole')

  const handleNavigate = async () => {
    try {
      const uniqueID = crypto.randomUUID()
      dispatch({ type: 'update_interview_id', payload: uniqueID })

      // Toggle Back - Quota

      // if (!auth) {
      //   if (localStorage.getItem('rem')) {
      //     const test = parseInt(localStorage.getItem('rem') || '1') - 1
      //     localStorage.setItem('rem', String(test))
      //   }
      // } else {
      //   try {
      //     const controller = new AbortController()
      //     const resp = await quotaAPI.updateInterviewQuota(
      //       api,
      //       controller.signal
      //     )
      //     if (resp instanceof Error) throw resp
      //   } catch (e: Error | any) {
      //     toast({ description: <p>{e.message}</p> })
      //   }
      // }

      return navigate(`/interview/${uniqueID}`)
    } catch (error) {
      console.error('Error creating interview:', error)
    }
  }
  return (
    <Dialog>
      <DialogTrigger className={`${buttonVariants({ variant: 'tertiary' })} mb-4`}>
        Start Interview
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='text-left'>
          <DialogTitle className='text-left pb-4 text-2xl'>
            Confirm Interview Customization
          </DialogTitle>
          <DialogDescription className='text-left'>
            <p className='mb-2'>
              <span className='font-semibold text-lg'>Role: {currentRole}</span>
            </p>
            Customizations:
            <br />
            <ul className='pl-5 list-none'>
              <li>
                Question Count:{' '}
                {
                  interviewInformation.interviewData?.interviewOptions
                    .questionCount
                }
              </li>
              <li>
                Interview Difficulty:{' '}
                {
                  interviewInformation.interviewData?.interviewOptions
                    .questionDifficulty
                }
              </li>
              <li>
                Skip First Question:{' '}
                {interviewInformation.interviewData?.interviewOptions.skipFirst
                  ? 'Yes'
                  : 'No'}
              </li>
              <li>
                Interview Type:{' '}
                {
                  interviewInformation.interviewData?.interviewOptions
                    .questionType
                }
              </li>
            </ul>
            <br />
            <div className='flex justify-end space-x-4'>
              <DialogClose className={buttonVariants({ variant: 'outline' })}>
                Close
              </DialogClose>

              <Button variant={'default'} onClick={handleNavigate}>
                Confirm
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default PreparePopup
