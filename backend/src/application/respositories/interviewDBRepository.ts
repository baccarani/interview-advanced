const interviewRepository = (repository: any) => {
  const findAll = (params: any) => repository.findAll(params)
  const countAll = (params: any) => repository.countAll(params)
  const findById = (id: string) => repository.findById(id)
  const findByParams = (params: { sub: string }) =>
    repository.findByParams(params)
  const add = (interview: any) => repository.add(interview)
  const updateById = (id: any, interview: any) =>
    repository.updateById(id, interview)
  const deleteById = (id: any) => repository.deleteById(id)
  const generateChartDataDashboard = (sub: string) =>
    repository.generateChartDataDashboard(sub)
  const generateChartDataResult = (sub: string) =>
    repository.generateChartDataResult(sub)
  const generateDashboardAnalytics = (sub: string) =>
    repository.generateDashboardAnalytics(sub)

  return {
    add,
    countAll,
    findAll,
    findById,
    findByParams,
    updateById,
    deleteById,
    generateChartDataDashboard,
    generateChartDataResult,
    generateDashboardAnalytics,
  }
}
export default interviewRepository
