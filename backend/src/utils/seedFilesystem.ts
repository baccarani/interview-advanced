import path from 'path'
import fs from 'fs'
import { appConfig } from '../config/app.config'
import { uploadPaths } from './types'

const uploadsDirectory = path.join(__dirname, appConfig.multerFilePath)

export const seedFilesystem = (userId: string) => {
  const userDirectory = path.join(uploadsDirectory, userId)

  if (!fs.existsSync(uploadsDirectory)) {
    try {
      fs.mkdirSync(uploadsDirectory)
    } catch (err) {
      console.error('Error creating uploads directory', err)
    }
  }

  if (!fs.existsSync(userDirectory)) {
    try {
      fs.mkdirSync(userDirectory)
      for (const p of uploadPaths) {
        fs.mkdirSync(path.join(userDirectory, p))
      }
    } catch (err) {
      console.error('Error creating user directory', err)
    }
  } else {
    for (const p of uploadPaths) {
      if (!fs.existsSync(path.join(userDirectory, p))) {
        fs.mkdirSync(path.join(userDirectory, p))
      }
    }
  }
  return { message: 'File system seeding complete' }
}
