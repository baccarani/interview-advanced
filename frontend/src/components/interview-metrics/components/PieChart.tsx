import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(Tooltip, Legend, ArcElement)

type Props = {
  data?: any
}

export const DashboardPieChart = ({ data }: Props) => {
  const options = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
          },
          color: '#808080',
        },
      },
    },
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: '300px',
        marginBottom: '20px',
      }}
    >
      <div style={{ width: '300px', height: '300px' }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  )
}
