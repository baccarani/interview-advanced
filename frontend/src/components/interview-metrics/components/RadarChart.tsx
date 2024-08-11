import { Radar } from 'react-chartjs-2'
import {
  Chart,
  RadialLinearScale,
  PointElement,
  LineElement,
  LineController,
  Filler,
} from 'chart.js'

Chart.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  LineController,
  Filler
)

type Props = {
  data?: any
}

export const DashboardRadarChart = ({ data }: Props) => {
  const isMobile = window.innerWidth <= 768;
  const fontSize = isMobile ? 12 : 14; // smaller size for mobile

  return (
    <div className='flex justify-center items-center ml-0 -mb-10 md:mb-0 md:ml-4 md:p-10 lg:mb-0 lg:ml-4 lg:p-10 mb-4 md:mb-0 py-4 md:py-0'>
      <div className='w-full lg:w-4/5 h-full lg:h-4/5'>
        <Radar
          data={data}
          options={{
            scales: {
              r: {
                min: 1,
                max: 5,
                angleLines: {
                  color: 'rgba(200, 200, 200, 0.5)', // Gray color
                },
                ticks: {
                  stepSize: 1,
                },
                grid: {
                  color: '#ccc',
                },
                pointLabels: {
                  font: {
                    size: fontSize,
                  },
                  color: '#808080',
                  padding: 5,
                },
              },
            },
            plugins: {
              legend: {
                labels: {
                  font: {
                    size: fontSize,
                  },
                  color: '#808080',
                },
              },
            },
          }}
        />
      </div>
    </div>
  )
}