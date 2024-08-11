import { Suspense, useEffect, useState } from 'react'
import Layout from '@/layout/Layout'
import NoteQuestions from '@/components/note-questions/NoteQuestions'
import { useInterview } from '@/context/InterviewFlowProvider'
import InterviewRework from '@/features/interview/InterviewRework'
import { useGenerateInterviewQuestions } from './hooks/useGenerateInterviewQuestions'
import LoaderCustom from '@/commons/components/LoaderCustom'
import { Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const InterviewPage = () => {
  const { state } = useInterview()
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const { roleInformation, interviewInformation } = state
  const { data, loading } = useGenerateInterviewQuestions()

  // auto scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [interviewMaxHeight, setInterviewMaxHeight] = useState(
    window.innerWidth <= 768 ? '67vh' : '85vh'
  )
  const [notesMaxHeight, setNotesMaxHeight] = useState(
    window.innerWidth <= 768 ? '33vh' : '85vh'
  )

  useEffect(() => {
    const handleResize = () => {
      setInterviewMaxHeight(window.innerWidth <= 768 ? '50vh' : '85vh')
      setNotesMaxHeight(window.innerWidth <= 768 ? '50vh' : '85vh')
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Reuable Chunk of code for the interview details to be used.
  const interviewDetails = (
    <div
      className={
        isMobile
          ? 'flex flex-col sm:justify-start'
          : 'flex flex-col sm:flex-row sm:justify-start'
      }
    >
      <span className='mb-2 font-semibold text-lg'>
        {isMobile && 'Interview Customizations'}
      </span>
      <p className='font-light sm:mr-4'>
        # of Interview Questions:{' '}
        <span className='font-semibold'>
          {interviewInformation.interviewData?.interviewOptions.questionCount}
        </span>
      </p>
      <p className='font-light sm:mr-4'>
        Interview Type:{' '}
        <span className='font-semibold'>
          {interviewInformation.interviewData?.interviewOptions.questionType}
        </span>
      </p>
      <p className='font-light sm:mr-4'>
        Difficulty:{' '}
        <span className='font-semibold'>
          {
            interviewInformation.interviewData?.interviewOptions
              .questionDifficulty
          }
        </span>
      </p>
      <p className='font-light sm:mr-4'>
        Skip <span className='italic'>"Tell me about Yourself?"</span>:{' '}
        <span className='font-semibold'>
          {interviewInformation.interviewData?.interviewOptions.skipFirst
            ? 'Yes'
            : 'No'}
        </span>
      </p>
    </div>
  )

  // Full layout of the interactive Interview
  return (
    <Layout>
      <div className='flex flex-col md:flex-row space-x-0 md:space-x-4 space-y-4 md:space-y-0'>
        <div
          className='flex flex-col w-full md:w-2/3 h-2/3 md:h-full overflow-y-auto md:pr-5'
          style={{ maxHeight: interviewMaxHeight }}
        >
          <div className='overflow-y-auto h-full'>
            <h2 className='mb-4 text-4xl font-light mt-5 tracking-tight'>
              {roleInformation.roleName} Interview
              {isMobile && (
                <TooltipProvider>
                  <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
                    <TooltipTrigger
                      className='inline-flex items-center ml-2'
                      onClick={() => setTooltipOpen(!tooltipOpen)}
                    >
                      <Info className='w-4 h-4' />
                    </TooltipTrigger>
                    <TooltipContent>{interviewDetails}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </h2>
            {!isMobile && interviewDetails}
            <Suspense fallback={<LoaderCustom />}>
              <InterviewRework messages={data} loading={loading} />
            </Suspense>
          </div>
        </div>

        <div
          className='w-full md:w-1/3 h-1/3 md:h-full overflow-y-auto md:max-h-85 pt-5 pb-5 pr-5'
          style={{ maxHeight: notesMaxHeight }}
        >
          <h2 className='text-4xl font-light mb-4'>Interview Questions</h2>

          <Suspense fallback={<LoaderCustom />}>
            <NoteQuestions questions={data} />
          </Suspense>
        </div>
      </div>
    </Layout>
  )
}

export default InterviewPage