import fs from 'fs'

export const readFile = async (path: string): Promise<string> => {
  const stream = fs.createReadStream(path)
  let data = ''
  for await (const chunks of stream) {
    data += chunks.toString()
  }
  return data
}

export const createFile = async (path: string, data: Buffer) => {
  try {
    const writeStream = fs.createWriteStream(path)

    writeStream.on('ready', () => {
      console.log('Write Stream is ready')
    })
    writeStream.on('error', (e) => {
      throw e
    })
    writeStream.on('finish', () => {
      console.log('Write Stream is Finished')
    })

    writeStream.write(data)
  } catch (e: unknown) {
    if (e instanceof Error) console.log(e.message)
  }
}
