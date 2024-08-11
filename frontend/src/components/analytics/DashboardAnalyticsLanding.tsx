import { Card } from '../ui/card'
import { Skeleton } from '../ui/skeleton'
import { useGetLandingAnalytics } from './hooks/useGetLandingAnalytics'

type Props = {
  renderTrigger?: boolean
}

export const DashboardAnalyticsLanding = ({ renderTrigger }: Props) => {
  const { data, error } = useGetLandingAnalytics(renderTrigger)

  if (error) return <p>Error</p>
  return (
    <>
      {!data ? (
        <div className='w-full h-[100px]'>
          <Skeleton className='w-full h-full' />
        </div>
      ) : (
        <Card className='p-2 bg-transparent mb-8 flex flex-wrap'>
          <div className='md:w-1/3 w-full md:border-r border-gray-200 py-2 text-center border-b md:border-b-0 mb-4 md:mb-0'>
            <p className='text-2xl pb-2 font-bold'>
              {data.totalInterviewCount}
            </p>
            Total # of Interviews Completed
          </div>
          <div className='md:w-1/3 w-full md:border-r border-gray-200 py-2 text-center border-b md:border-b-0 mb-4 md:mb-0'>
            <p className='text-2xl pb-2 font-bold'>
              {data.avgScoreOverall} / 5
            </p>
            Average Score
          </div>
          <div className='md:w-1/3 w-full py-2 text-center'>
            <p className='text-xl pb-2 font-bold'>{data.mostFrequentRole}</p>
            Most Frequent Role
          </div>
        </Card>
      )}
    </>
  )
}
