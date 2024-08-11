export default async (
  token: any,
  authService: any,
  interviewRepository: any
) => {
  try {
    const payload = authService.decodeToken(token)
    if (payload instanceof Error) throw payload
    const { sub } = payload
    const data = await interviewRepository.generateDashboardAnalytics(sub)
    if (data instanceof Error) throw data
    const { avgScoreArray, mostFrequentRole, totalCount } = data[0]
    return {
      avgScoreOverall:
        avgScoreArray.length > 0
          ? avgScoreArray[0].averageScorePerInterview.toFixed(1)
          : 0,
      totalScore: avgScoreArray.length > 0 ? avgScoreArray[0].totalScore : 0,
      totalInterviewCount:
        totalCount.length > 0 ? totalCount[0].totalDocuments : 0,
      mostFrequentRole:
        mostFrequentRole.length > 0 ? mostFrequentRole[0]._id : 'Not Available',
      hasData: mostFrequentRole.length > 0 ? true : false,
    }
  } catch (e) {
    return e
  }
}
