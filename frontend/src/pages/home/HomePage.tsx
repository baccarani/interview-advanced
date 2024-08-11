import { Card } from '@/components/ui/card'
import { PastInterview } from '@/components/past-interviews/PastInterview'
import { useProfile } from '@/context/ProfileProvider'
import InterviewSetup from '@/features/interview-setup/InterviewSetup'
import Layout from '@/layout/Layout'
import Container from '@/layout/container/Container'
import Typewriter from 'typewriter-effect'
import { useEffect, useState } from 'react'
import { useInterview } from '@/context/InterviewFlowProvider'
import { Badge } from '@/components/ui/badge'
import InterviewMetrics from '@/components/interview-metrics/InterviewMetrics'
import { FaqAccordion } from '@/components/faq-accordion/FaqAccordion'
import { Link, useLocation } from 'react-router-dom'
import { buttonVariants } from '@/components/ui/button'
import { capitalize } from '@/utils/capitalize'
const HomePage = () => {
  const { profile } = useProfile()
  const { dispatch } = useInterview()
  const [renderTrigger, setRenderTrigger] = useState(false)

  const location = useLocation()
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (location.pathname === '/') {
      event.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    dispatch({ type: 'reset_flow', payload: null })
    window.scrollTo(0, 0)
    if (!localStorage.getItem('rem')) {
      localStorage.setItem('rem', '1')
    }
  }, [])

  return (
    <Layout>
      <Container className='grid grid-cols-1 gap-4 pb-4'>
        <div>
          <h1 className='text-4.5xl font-semibold leading-tight mt-4 sm:text-5xl sm:leading-tight mb-2'>
            <div className='inline-block bg-gradient-to-r from-blue-500 to-red-500 text-transparent bg-clip-text'>
              <Typewriter
                options={{
                  strings: 'Hi, ' + capitalize(profile?.name || 'Interviewee'),
                  autoStart: true,
                  delay: 17.5,
                  cursor: '',
                }}
              />
            </div>
            <br />
            <span className='text-gray-450'>Ready to ace your interview?</span>
          </h1>
        </div>

        <InterviewSetup />

        {profile ? (
          <PastInterview
            renderTrigger={renderTrigger}
            setRenderTrigger={setRenderTrigger}
          />
        ) : null}

        {!profile && (
          <>
            <Card className='bg-transparent border-none mb-10'>
              <Badge variant='outline'>HOW IT WORKS</Badge>
              <h2 className='text-4xl font-semibold leading-tight my-4'>
                Generate interview metrics and insights
              </h2>
              <p className='text-xl font-light mb-8'>
                Complete practice interviews to unlock metrics and insights,
                with recommendations on how to improve.
              </p>
              <InterviewMetrics />
            </Card>
            <Card className='bg-transparent border-none mb-10'>
              <Badge variant='outline'>FAQ</Badge>
              <h2 className='text-4xl font-semibold leading-tight my-4'>
                Frequently asked questions
              </h2>
              <p className='text-xl font-light mb-4'>
                Explore our FAQ section to find quick answers to frequently
                asked questions.
              </p>
              <FaqAccordion />

              <Link
                to='/'
                onClick={handleClick}
                className={`${buttonVariants({
                  variant: 'default',
                })} flex justify-center items-center mt-12`}
              >
                Start New Interview
              </Link>
            </Card>
          </>
        )}
      </Container>
    </Layout>
  )
}
export default HomePage
