import interviewModel from '../models/interview.model'

const omit = (obj: Object, ...props: any) => {
  const result = { ...obj }
  let key: keyof typeof result
  for (key of props) {
    delete result[key]
  }
  return result
}

const interviewRepositoryMongodb = () => {
  // Find All Documents

  const findAll = async (params: any) => {
    return await interviewModel
      .find(omit(params, 'page', 'sortObject', 'perPage'))
      .skip(params.perPage * params.page - params.perPage)
      .sort(params.sortObject)
      .limit(params.perPage)
  }

  // Get count of Documents

  const countAll = async (params: { perPage: number; page: number }) => {
    return await interviewModel.countDocuments(
      omit(params, 'page', 'sortObject', 'perPage')
    )
  }

  // Get Document based on ID

  const findById = async (id: string) =>
    await interviewModel
      .findById(id)
      .populate(['interviewTranscript', 'feedbackTranscript'])
      .lean()

  // Create New Profile

  const add = async (interviewEntity: any) => {
    const newInterview = new interviewModel({
      sub: interviewEntity.getSub(),
      jobName: interviewEntity.getJobName(),
      jobDescription: interviewEntity.getJobDescription(),
      interviewState: interviewEntity.getInterviewState(),
      interviewTranscript: interviewEntity.getInterviewTranscript(),
      feedbackTranscript: interviewEntity.getFeedbackTranscript(),
      averageScore: interviewEntity.getAverageScore(),
      numberOfQuestionsAsked: interviewEntity.getNumberofQuestionsAsked(),
      difficultyOfQuestionsAsked:
        interviewEntity.getdifficultyOfQuestionsAsked(),
      typeOfQuestionsAsked: interviewEntity.gettypeOfQuestionsAsked(),
    })

    return await newInterview.save()
  }

  // Update Profile Based on sub - unique Identifier

  const updateById = async (id: string, interviewEntity: any) => {
    const updateProfile = {
      interviewState: interviewEntity.getInterviewState(),
      interviewTranscript: interviewEntity.getInterviewTranscript(),
      feedbackTranscript: interviewEntity.getFeedbackTranscript(),
      averageScore: interviewEntity.getAverageScore(),
    }
    return await interviewModel.findByIdAndUpdate(
      id,
      { $set: updateProfile },
      { new: true }
    )
  }

  // Delete Profile based on sub - unique Identifier
  const deleteById = async (id: string) =>
    await interviewModel.findByIdAndDelete(id)

  const generateChartDataDashboard = async (
    id: string
  ): Promise<{
    pieChartData: Array<{ count: number; label: string }>
    radarChartData: Array<{
      _id: string
      Communication: number
      'Problem Solving': number
      Adaptability: number
      Creativity: number
      Leadership: number
    }>
    barChartData: any[]
  }> => {
    const pieChartData = await interviewModel.aggregate([
      { $match: { sub: id } },
      { $group: { _id: '$jobName', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 },
      { $project: { _id: 0, label: '$_id', count: 1 } },
    ])

    const radarChartData = await interviewModel.aggregate([
      { $match: { sub: id, interviewState: 'completed' } },
      {
        $group: {
          _id: '$jobName',
          count: { $sum: 1 },
          feedbackTranscripts: { $push: '$feedbackTranscript' },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 3 },
      { $unwind: '$feedbackTranscripts' },
      {
        $lookup: {
          from: 'feedback_transcripts',
          localField: 'feedbackTranscripts',
          foreignField: '_id',
          pipeline: [
            {
              $project: {
                feedbackEntries: 1,
              },
            },
          ],
          as: 'dets',
        },
      },
      { $unwind: '$dets' },
      { $unwind: '$dets.feedbackEntries' },
      {
        $group: {
          _id: '$dets._id',
          jobName: { $first: '$_id' },
          'Problem Solving': {
            $avg: '$dets.feedbackEntries.skillsScore.problemSolvingScore',
          },
          Communication: {
            $avg: '$dets.feedbackEntries.skillsScore.communicationScore',
          },
          Teamwork: {
            $avg: '$dets.feedbackEntries.skillsScore.teamworkScore',
          },
          Adaptability: {
            $avg: '$dets.feedbackEntries.skillsScore.adaptabilityScore',
          },
          Creativity: {
            $avg: '$dets.feedbackEntries.skillsScore.creativityScore',
          },
          Leadership: {
            $avg: '$dets.feedbackEntries.skillsScore.leadershipScore',
          },
          totalCount: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: '$jobName',
          'Problem Solving': {
            $avg: '$Problem Solving',
          },
          Communication: {
            $avg: '$Communication',
          },
          Teamwork: {
            $avg: '$Teamwork',
          },
          Adaptability: {
            $avg: '$Adaptability',
          },
          Creativity: {
            $avg: '$Creativity',
          },
          Leadership: {
            $avg: '$Leadership',
          },
        },
      },
    ])

    const barChartData = await interviewModel.aggregate([
      { $match: { sub: id, interviewState: 'completed' } },
      {
        $group: {
          _id: '$jobName',
          score: { $avg: '$averageScore' },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 3,
      },
    ])
    return { pieChartData, radarChartData, barChartData }
  }

  const generateChartDataResult = async (id: string) => {
    return await interviewModel
      .findById(id)
      .populate('feedbackTranscript')
      .lean()
  }

  const generateDashboardAnalytics = async (sub: string) => {
    return await interviewModel.aggregate<{
      avgScoreArray: Array<{
        _id: string
        averageScorePerInterview: number
        totalScore: number
      }>
      totalCount: Array<{ _id: string; totalDocuments: number }>
      mostFrequentRole: Array<{ _id: string; count: number }>
    }>([
      {
        $facet: {
          avgScoreArray: [
            {
              $match: {
                sub,
                interviewState: 'completed',
              },
            },
            {
              $group: {
                _id: '$sub',
                averageScorePerInterview: { $avg: '$averageScore' },
                totalScore: { $sum: '$averageScore' },
              },
            },
          ],

          mostFrequentRole: [
            { $match: { sub } },
            { $group: { _id: '$jobName', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 },
          ],
          totalCount: [{ $match: { sub } }, { $count: 'totalDocuments' }],
        },
      },
    ])
  }

  // Return

  return {
    findAll,
    countAll,
    findById,
    add,
    updateById,
    deleteById,
    generateChartDataDashboard,
    generateChartDataResult,
    generateDashboardAnalytics,
  }
}

export default interviewRepositoryMongodb
