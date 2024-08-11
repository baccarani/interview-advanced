import mongoose, { MongooseError } from 'mongoose'

export const setupDB = async (url: string): Promise<void> => {
  try {
    await mongoose.connect(url)
    console.log('Connection Established')
  } catch (e: MongooseError | any) {
    console.log('Error from Mongodb Initial Connection -:- ' + e.message)
    process.exit()
  }
}

export const dbDisconnect = async (): Promise<void> => {
  try {
    await mongoose.disconnect()
    console.log('Connection Severed')
  } catch (e: MongooseError | any) {
    console.log('Error from Mongodb Manual disconnect -:- ' + e.message)
    process.exit()
  }
}
