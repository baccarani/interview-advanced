import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type Props = {
  data?: any
}

export const DashBoardBarChart = ({ data }: Props) => {
  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: false,
          text: 'Interviews',
          color: '#808080',
        },
        ticks: {
          color: '#808080',
          font: {
            size: 14,
          },
        },
        grid: {
          color: 'rgba(128, 128, 128, 0.1)',
        },
      },
      y: {
        title: {
          display: false,
          text: 'Score',
          color: '#808080',
        },
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
          color: '#808080',
          font: {
            size: 14,
          },
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.5)', // Gray color
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#808080',
          font: {
            size: 14,
          },
        },
      },
    },
  }

  return (
    <div style={{ height: '300px', marginBottom: '20px' }}>
      <Bar data={data} options={options} />
    </div>
  )
}
