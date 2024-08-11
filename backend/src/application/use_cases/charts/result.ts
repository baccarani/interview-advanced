export default async (id: any, interviewRepository: any) => {
  try {
    const chartData = await interviewRepository.generateChartDataResult(id)
    if (chartData instanceof Error) throw chartData

    const formatedData = {
      labels: chartData.feedbackTranscript.feedbackEntries.map(
        (_: any, index: number) => `Q${index + 1}`
      ),
      datasets: [
        {
          label: 'Score',
          data: chartData.feedbackTranscript.feedbackEntries.map(
            (node: any) => node.overallScorePerResponse
          ),
          fill: false,
          backgroundColor: 'rgb(59, 130, 246)',
          borderColor: 'rgba(59, 130, 246, 0.2)',
        },
      ],
    }
    return formatedData
  } catch (e) {
    return e
  }
}
