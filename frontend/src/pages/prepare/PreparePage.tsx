import Layout from '@/layout/Layout'
import Container from '@/layout/container/Container'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useInterview } from '@/context/InterviewFlowProvider'
import { Switch } from '@/components/ui/switch'
import PreparePopup from '@/components/prepare/PreparePopup'
import { useEffect } from 'react'
// import { useState } from 'react'
// import MicChecker from '@/components/mic-checker/MicChecker'

const PreparePage = () => {
  const { state, dispatch } = useInterview()
  // const [micStatus, setMicStatus] = useState<boolean>(false)
  const { interviewInformation } = state
  const currentRole = localStorage.getItem('currentRole')
  const questionCount = [3, 4, 5]
  const questionType = ['Behavioral', 'Technical', 'Mixed']
  const questionDifficulty = ['Easy', 'Medium', 'Hard', 'Advanced']

  // auto scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const changeQuestionCount = (questionCount: number) => {
    dispatch({ type: 'update_interview_options', payload: { questionCount } })
  }

  const changeQuestionType = (questionType: string) => {
    dispatch({ type: 'update_interview_options', payload: { questionType } })
  }

  const changeQuestionDifficulty = (questionDifficulty: string) => {
    dispatch({
      type: 'update_interview_options',
      payload: { questionDifficulty },
    })
  }

  const handleCheckboxChange = () => {
    dispatch({
      type: 'update_interview_options',
      payload: {
        skipFirst:
          !interviewInformation.interviewData?.interviewOptions.skipFirst,
      },
    })
  }

  return (
    <Layout>
      <Container className='grid grid-cols-1 gap-4 py-4'>
        <div id='prepare-page'>
          <h1 className='text-5xl font-semibold leading-tight mt-4 mb-4'>
            <span className=''>Prepare for your interview</span>
          </h1>

          <h2 className='text-3xl leading-tight mb-4'>
            <span className='font-thin'>
              Get ready for your{' '}
              <span className='font-semibold'>{currentRole}</span> interview.
            </span>
          </h2>

          <h2 className='text-3xl leading-tight mb-4 mt-12 items-center'>
            <span className='font-semibold flex items-center'>
              Customize your interview
            </span>
          </h2>

          <Card className='mb-5 p-5 bg-transparent sm:flex sm:flex-col sm:items-start md:flex md:flex-col md:flex-row md:items-center justify-between items-center'>
            <div className='mb-5 sm:mb-5 lg:mb-0 md:mb-0 mr-4'>
              <p>
                Choose between easy, medium, hard or advanced interview
                questions.
              </p>
            </div>
            <div>
              <ul className='flex items-center gap-4 flex-wrap md:flex-nowrap'>
                {questionDifficulty.map((questionDifficulty) => (
                  <li key={questionDifficulty}>
                    <Button
                      onClick={() =>
                        changeQuestionDifficulty(questionDifficulty)
                      }
                      className={buttonVariants({
                        variant:
                          interviewInformation.interviewData?.interviewOptions
                            .questionDifficulty === questionDifficulty
                            ? 'secondary'
                            : 'outline',
                      })}
                    >
                      {questionDifficulty}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          <Card className='mb-5 p-5 bg-transparent sm:flex sm:flex-col sm:items-start md:flex md:flex-col md:flex-row md:items-center justify-between items-center'>
            <div className='mb-5 sm:mb-5 lg:mb-0 md:mb-0 mr-4'>
              <p>
                Choose between behavioral, technical or mixed interview
                questions.
              </p>
            </div>
            <div>
              <ul className='flex items-center gap-4 flex-wrap md:flex-nowrap'>
                {questionType.map((questionType) => (
                  <li key={questionType}>
                    <Button
                      onClick={() => changeQuestionType(questionType)}
                      className={buttonVariants({
                        variant:
                          interviewInformation.interviewData?.interviewOptions
                            .questionType === questionType
                            ? 'secondary'
                            : 'outline',
                      })}
                    >
                      {questionType}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          <Card className='mb-5 p-5 bg-transparent sm:flex sm:flex-col sm:items-start md:flex md:flex-col md:flex-row md:items-center justify-between items-center'>
            <div className='mb-5 sm:mb-5 lg:mb-0 md:mb-0 mr-4'>
              <p>How many questions would you like for your interview?</p>
            </div>
            <div>
              <ul className='flex items-center gap-4 flex-wrap md:flex-nowrap'>
                {questionCount.map((questionCount) => (
                  <li key={questionCount}>
                    <Button
                      onClick={() => changeQuestionCount(questionCount)}
                      className={`${buttonVariants({
                        variant:
                          interviewInformation.interviewData?.interviewOptions
                            .questionCount === questionCount
                            ? 'secondary'
                            : 'outline',
                      })} w-20`}
                    >
                      {questionCount}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          <Card className='mb-5 p-5 bg-transparent flex justify-between items-center'>
            <div>
              Skip the first question for:{' '}
              <span className='italic'>"Tell me about yourself?"</span>
            </div>
            <div>
              <Switch
                checked={
                  interviewInformation.interviewData?.interviewOptions.skipFirst
                }
                onCheckedChange={handleCheckboxChange}
                className='ml-4'
              />
            </div>
          </Card>

          {/* <h2 className='text-3xl leading-tight mb-4 mt-12'>
            <span className='font-semibold'>Test your microphone</span>
          </h2> */}

          {/* <div>
            <Card className='p-5 mt-4 mb-4 bg-transparent'>
              <MicChecker setMicStatus={setMicStatus} />
            </Card>
          </div> */}

          <div className='my-8'>
            <div className='flex items-center text-green-600 mt-4'>
              <span className='mr-2'>✅</span>
              <span>You are ready to start your interview.</span>
            </div>
          </div>

          <PreparePopup />
        </div>
      </Container>
    </Layout>
  )
}
export default PreparePage
