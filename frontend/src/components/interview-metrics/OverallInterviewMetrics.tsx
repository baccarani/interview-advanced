import { Card } from '../ui/card'
import { DashBoardBarChart } from './components/BarChart'
import { DashboardPieChart } from './components/PieChart'
import { DashboardRadarChart } from './components/RadarChart'
import { useGetDashboardChartData } from './hooks/useGetDashboardChartData'
import { Skeleton } from '../ui/skeleton'
import NoChartData from '@/assets/no-chart-data.png'

type Props = {
  renderTrigger: boolean
}

export const OverallInterviewMetrics = ({ renderTrigger }: Props) => {
  const { data, error } = useGetDashboardChartData(renderTrigger)

  if (error) return <p>{error.message}</p>

  if (data && !data.hasData)
    return (
      <div className='flex flex-col items-center justify-center pb-10'>
        <img
          src={NoChartData}
          className='block mx-auto p-4 w-full max-w-xs max-h-xs sm:max-w-xs sm:max-h-xs md:max-w-xs md:max-h-xs'
          alt='No results'
        />
        <p className='text-center font-light text-xl pt-4'>No Data Found.</p>
      </div>
    )

  return (
    <>
      {!data ? (
        <div className='w-full h-[500px]'>
          <Skeleton className='w-full h-full' />
        </div>
      ) : (
        <>
          <p className='mb-2 italic'>Click on the job roles in the legend to show or hide them on the chart.</p>
          <div className='flex justify-center items-center'>
            <div className='grid gap-4 w-full max-w-7xl'>
              <Card className='row-span-1 text-center sm:p-6 bg-transparent'>
                <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight mb-4 mt-8 sm:mt-2 mx-14'>
                  Distribution of Interview Scores by Job Attributes
                </h3>
                <div className='w-full p-1 sm:pb-0 pb-10'>
                  <DashboardRadarChart data={data.formatedRadarChartData} />
                </div>
              </Card>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Card className='sm:p-6 text-center bg-transparent'>
                  <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight mb-4 mt-8 sm:mt-2 mx-14'>
                    Distribution of Completed Interviews by Job Title
                  </h3>
                  <div className='w-full p-1'>
                    <DashboardPieChart data={data.formatedPieChartData} />
                  </div>
                </Card>

                <Card className=' sm:p-6 text-center bg-transparent'>
                  <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight mb-4 mt-8 sm:mt-2 mx-14 pb-4'>
                    Average Interview Scores by Job Title
                  </h3>
                  <div className='w-full p-1'>
                    <DashBoardBarChart data={data.formatedBarChartData} />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
