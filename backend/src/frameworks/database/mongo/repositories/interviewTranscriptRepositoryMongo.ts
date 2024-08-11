import interviewTranscriptModel from '../models/interview_transcript.model'

const omit = (obj: Object, ...props: any) => {
  const result = { ...obj }
  let key: keyof typeof result
  for (key of props) {
    delete result[key]
  }
  return result
}

const interviewTranscriptRepositoryMongodb = () => {
  // Find All Documents

  const findAll = async (params: any) => {
    return await interviewTranscriptModel
      .find(omit(params, 'page', 'sortObject', 'perPage'))
      .skip(params.perPage * params.page - params.perPage)
      .sort(params.sortObject)
      .limit(params.perPage)
  }

  // Get count of Documents

  const countAll = async (params: { perPage: number; page: number }) => {
    return await interviewTranscriptModel.countDocuments(
      omit(params, 'page', 'sortObject', 'perPage')
    )
  }

  // Get Document based on ID

  const findById = async (id: string) =>
    await interviewTranscriptModel
      .findById(id)
      .populate(['interviewTranscript', 'feedbackTranscript'])
      .lean()

  // Create New Profile

  const add = async (interviewTranscriptEntity: any) => {
    const newInterview = new interviewTranscriptModel({
      sub: interviewTranscriptEntity.getSub(),
      uuid: interviewTranscriptEntity.getUUID(),
      responseCollection: interviewTranscriptEntity.getResponseCollection(),
    })

    return await newInterview.save()
  }

  // Update Profile Based on sub - unique Identifier

  const updateById = async (id: string, interviewTranscriptEntity: any) => {
    const updateProfile = {
      feedbackEntries: interviewTranscriptEntity.getFeedbackEntries(),
      metadata: interviewTranscriptEntity.getFeedbackMetaData(),
    }
    return await interviewTranscriptModel.findByIdAndUpdate(
      id,
      { $set: updateProfile },
      { new: true }
    )
  }

  // Delete Profile based on sub - unique Identifier
  const deleteById = async (id: string) =>
    await interviewTranscriptModel.findByIdAndDelete(id)

  // Return

  return { findAll, countAll, findById, add, updateById, deleteById }
}

export default interviewTranscriptRepositoryMongodb
