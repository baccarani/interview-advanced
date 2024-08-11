import InterviewQuotaModel from '../models/interviewQuota.model'

const omit = (obj: Object, ...props: any) => {
  const result = { ...obj }
  let key: keyof typeof result
  for (key of props) {
    delete result[key]
  }
  return result
}

const interviewQuoteRepository = () => {
  // Find All Documents
  const findAll = async (params: { perPage: number; page: number }) => {
    return await InterviewQuotaModel.find(omit(params, 'page', 'perPage'))
      .skip(params.perPage * params.page - params.perPage)
      .limit(params.perPage)
  }

  // Get count of Documents
  const countAll = async () => await InterviewQuotaModel.countDocuments()

  // Get Document By ID
  const findById = async (id: string) =>
    await InterviewQuotaModel.findById(id).lean()

  // Get Document By Params
  const findByParams = async (params: { sub: string }) => {
    return await InterviewQuotaModel.findOne(params).lean()
  }

  // Add New Document

  const add = async (interviewQuoteEntity: any) => {
    const newQuote = new InterviewQuotaModel({
      sub: interviewQuoteEntity.getSub(),
      availableInterviews: interviewQuoteEntity.getAvailableInterviews(),
      usedInterviews: interviewQuoteEntity.getUsedInterviews(),
    })
    return await newQuote.save()
  }

  // Update Documents By Params
  const updateByParams = async (sub: string, interviewQuotaEntity: any) => {
    const update = {
      availableInterviews: interviewQuotaEntity.getAvailableInterviews(),
      usedInterviews: interviewQuotaEntity.getUsedInterviews(),
    }
    return await InterviewQuotaModel.findOneAndUpdate({ sub }, update, {
      new: true,
    })
  }

  // Delete Document By Params
  const deleteByParams = async (sub: string) => {
    return await InterviewQuotaModel.findOneAndDelete({ sub })
  }
  return {
    add,
    findAll,
    findById,
    findByParams,
    updateByParams,
    deleteByParams,
    countAll,
  }
}

export default interviewQuoteRepository
