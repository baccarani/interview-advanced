const interviewQuotaRepository = (repository: any) => {
  const findAll = (params: any) => repository.findAll(params)
  const countAll = (params: any) => repository.countAll(params)
  const findById = (id: string) => repository.findById(id)
  const findByParams = (params: { sub: string }) =>
    repository.findByParams(params)
  const add = (profile: any) => repository.add(profile)
  const updateByParams = (id: any, post: any) =>
    repository.updateByParams(id, post)
  const deleteById = (id: any) => repository.deleteById(id)

  return {
    add,
    countAll,
    findAll,
    findById,
    findByParams,
    updateByParams,
    deleteById,
  }
}
export default interviewQuotaRepository
