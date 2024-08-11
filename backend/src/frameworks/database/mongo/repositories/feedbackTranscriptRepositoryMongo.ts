import FeedbackTranscriptModel from '../models/feedback_transcript.model'

const omit = (obj: Object, ...props: any) => {
  const result = { ...obj }
  let key: keyof typeof result
  for (key of props) {
    delete result[key]
  }
  return result
}

const feedbackRepositoryMongodb = () => {
  // Find All Documents

  const findAll = async (params: any) => {
    return await FeedbackTranscriptModel.find(
      omit(params, 'page', 'sortObject', 'perPage')
    )
      .skip(params.perPage * params.page - params.perPage)
      .sort(params.sortObject)
      .limit(params.perPage)
  }

  // Get count of Documents

  const countAll = async (params: { perPage: number; page: number }) => {
    return await FeedbackTranscriptModel.countDocuments(
      omit(params, 'page', 'sortObject', 'perPage')
    )
  }

  // Get Document based on ID

  const findById = async (id: string) =>
    await FeedbackTranscriptModel.findById(id).lean()

  // Create New Profile

  const add = async (feedbackTranscriptEntity: any) => {
    const newFeedbackTranscript = new FeedbackTranscriptModel({
      sub: feedbackTranscriptEntity.getSub(),
      feedbackEntries: feedbackTranscriptEntity.getFeedbackEntries(),
      metadata: feedbackTranscriptEntity.getMetaData(),
    })
    return await newFeedbackTranscript.save()
  }

  // Update Profile Based on sub - unique Identifier

  const updateById = async (id: string, interviewEntity: any) => {
    const updateProfile = {
      feedbackEntries: interviewEntity.getFeedbackEntries(),
      metadata: interviewEntity.getFeedbackMetaData(),
    }
    return await FeedbackTranscriptModel.findByIdAndUpdate(
      id,
      { $set: updateProfile },
      { new: true }
    )
  }

  // Delete Profile based on sub - unique Identifier
  const deleteById = async (id: string) =>
    await FeedbackTranscriptModel.findByIdAndDelete(id)

  // Return

  return { findAll, countAll, findById, add, updateById, deleteById }
}

export default feedbackRepositoryMongodb
