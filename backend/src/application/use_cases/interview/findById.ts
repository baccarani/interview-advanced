const findById = async (interviewRepository: any, id: string) => {
  try {
    const data = await interviewRepository.findById(id)
    if (data instanceof Error) throw data
    return data
  } catch (e) {
    return e
  }
}

export default findById
