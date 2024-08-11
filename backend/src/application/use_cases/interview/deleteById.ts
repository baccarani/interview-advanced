const deleteById = async (interviewRepository: any, id: string) => {
  try {
    const data = await interviewRepository.deleteById(id)
    if (data instanceof Error) throw data
    return data
  } catch (e) {
    return e
  }
}

export default deleteById
