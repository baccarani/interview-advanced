import multer from 'multer'
import { UploadPathTypes } from './types'

const createDiskStorage = (uploadPath: UploadPathTypes) => {
  try {
    return multer.diskStorage({
      destination: `./upload/temp/${uploadPath}`,
      filename(req, file, cb) {
        const uniqueFileName = Date.now() + '-' + file.originalname
        cb(null, uniqueFileName)
      },
    })
  } catch (error) {
    console.error('Error in createDiskStorage:', error)
    throw error
  }
}

const audioUpload = multer({ storage: createDiskStorage('audio') })

export { audioUpload }
