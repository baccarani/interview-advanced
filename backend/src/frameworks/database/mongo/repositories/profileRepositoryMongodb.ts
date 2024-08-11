import ProfileModel from '../models/profile.model'

const omit = (obj: Object, ...props: any) => {
  const result = { ...obj }
  let key: keyof typeof result
  for (key of props) {
    delete result[key]
  }
  return result
}

const profileRepositoryMongodb = () => {
  // Find All Documents

  const findAll = async (params: { perPage: number; page: number }) => {
    return await ProfileModel.find(omit(params, 'page', 'perPage'))
      .skip(params.perPage * params.page - params.perPage)
      .limit(params.perPage)
  }

  // Get count of Documents

  const countAll = async (params: { perPage: number; page: number }) => {
    return await ProfileModel.countDocuments(omit(params, 'page', 'perPage'))
  }

  // Get Document based on ID

  const findById = async (id: string) => await ProfileModel.findById(id)

  // Get Document based on Params

  const findByParams = async (params: { sub: string }) =>
    await ProfileModel.findOne(params)

  // Create New Profile

  const add = async (profileEntity: any) => {
    const newProfile = new ProfileModel({
      sub: profileEntity.getSub(),
      name: profileEntity.getName(),
      email: profileEntity.getEmail(),
      picture: profileEntity.getPicture(),
    })

    return await newProfile.save()
  }

  // Update Profile Based on sub - unique Identifier

  const updateById = async (id: string, profileEntity: any) => {
    const updateProfile = {
      name: profileEntity.getName(),
      email: profileEntity.getEmail(),
      picture: profileEntity.getPicture(),
    }
    return await ProfileModel.findOneAndUpdate(
      { sub: id },
      { $set: updateProfile },
      { new: true }
    )
  }

  // Delete Profile based on sub - unique Identifier
  const deleteById = async (id: string) =>
    await ProfileModel.findOneAndDelete({ sub: id })

  // Return

  return {
    findAll,
    countAll,
    findById,
    add,
    updateById,
    deleteById,
    findByParams,
  }
}

export default profileRepositoryMongodb
