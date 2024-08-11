import { Mongoose } from 'mongoose'

export const connection = (
  mongoose: Mongoose,
  config: { mongo: { uri: string } },
  options: any
) => {
  // Setup Mongoose Connection

  const connectToMongo = () => {
    mongoose.connect(config.mongo.uri, options).then(
      () => {
        console.info('[Server]: Connected to Mongodb')
      },
      (err) => {
        console.error('[Server]: MongoDB Error', err)
      }
    )
  }

  // Event Listeners for Mongoose Connection

  mongoose.connection.on('connection', () => {
    console.info('[Server]: Connected to Mongodb')
  })
  mongoose.connection.on('reconnected', () => {
    console.info('[Server]: Connection Re-established')
  })
  mongoose.connection.on('error', (err) => {
    console.error(`[Server]: Error in MongoDB connection: ${err}`)
  })

  // Return Mongoose Connection

  return { connectToMongo }
}
