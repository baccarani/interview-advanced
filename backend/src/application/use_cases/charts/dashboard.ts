import { getColor } from '../../../utils/colors'

export default async (
  token: any,
  authService: any,
  interviewRepository: any
) => {
  try {
    const decodedToken = await authService.verifyToken(token)
    if (decodedToken instanceof Error) throw decodedToken
    const { sub } = decodedToken
    const data = await interviewRepository.generateChartDataDashboard(sub)
    if (data instanceof Error) throw data

    const { pieChartData, radarChartData, barChartData } = data

    const formatedPieChartData: {
      labels: Array<string>
      datasets: Array<{
        label: string
        data: Array<number>
        backgroundColor: Array<string>
      }>
    } = {
      labels: pieChartData.map((node: any) => node.label),
      datasets: [
        {
          label: 'Interview',
          data: pieChartData.map((node: any) => node.count),
          backgroundColor: pieChartData.map((_: any, index: any) =>
          getColor(index)
          ),
        },
      ],
    }

    const formatedRadarChartData = {
      labels: [
        'Communication',
        'Teamwork',
        'Adaptability',
        'Problem Solving',
        'Creativity',
        'Leadership',
      ],
      datasets: radarChartData.map((node: any, index: number) => {
        let temp: any = []
        let key: keyof any
        for (key in node) {
          if (key !== '_id') temp.push(node[key])
        }
        return {
          label: node._id,
          data: temp,
          backgroundColor: getColor(index),
          borderColor: getColor(index),
          pointBackgroundColor: '#2859b4',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#2859b4',
        }
      }),
    }

    const formatedBarChartData = {
      labels: barChartData.map((node: any) => {
        return node._id
      }),
      datasets: [
        {
          label: 'Score',
          data: barChartData.map((node: any) => node.score),
          backgroundColor: 'rgba(69, 123, 157, 0.5)', //colour for bar chart
        },
      ],
    }

    return {
      formatedPieChartData,
      formatedRadarChartData,
      formatedBarChartData,
      hasData: formatedBarChartData.datasets[0].data.length > 0 ? true : false,
    }
  } catch (e) {
    return e
  }
}
