import { useEffect, useState } from 'react'
import Layout from '@/layout/Layout'
import Container from '@/layout/container/Container'
import { DashboardAnalyticsLanding } from '@/components/analytics/DashboardAnalyticsLanding'
import { OverallInterviewMetrics } from '@/components/interview-metrics/OverallInterviewMetrics'
import { PastInterview } from '@/components/past-interviews/PastInterview'

const DashboardPage = () => {
  const [renderTrigger, setRenderTrigger] = useState<boolean>(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout>
      <Container className='grid grid-cols-1 gap-4 py-4'>
        <h1 className='text-5xl font-semibold leading-tight mt-4'>Dashboard</h1>

        <h2 className='text-3xl leading-tight mb-4 font-thin'>
          Explore your interview metrics with insightful visualizations.
        </h2>

        <DashboardAnalyticsLanding renderTrigger={renderTrigger} />
        <h2 className='text-3xl leading-tight'>
          <span className='font-semibold'>Interview Charts</span>
        </h2>
        <OverallInterviewMetrics renderTrigger={renderTrigger} />
        <br />

        <PastInterview
          renderTrigger={renderTrigger}
          setRenderTrigger={setRenderTrigger}
        />
      </Container>
    </Layout>
  )
}

export default DashboardPage
