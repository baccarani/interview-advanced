import { Router } from 'express'
import aiController from '../../../adapters/controller/ai.controller'
import { tryCatchWrapper } from '../../../utils/tryCatch'
import googleVoiceServiceInterface from '../../../application/services/googlevoice.service'
import googleVoiceServiceImpl from '../../services/googleVoiceService'
import { audioUpload } from '../../../utils/multer'

const aiRouter = (express: any) => {
  const router: Router = express.Router({ strict: true })
  const controller = aiController(
    googleVoiceServiceInterface,
    googleVoiceServiceImpl
  )

  router.post('/tts', tryCatchWrapper(controller.handleGoogleTts))

  router.post(
    '/stt',
    audioUpload.single('audio'),
    tryCatchWrapper(controller.handleGoogleStt)
  )

  // generates questions and saves it to the users model
  router.post(
    '/completions/questions',
    tryCatchWrapper(controller.generateQuestions)
  )

  router.post(
    '/completions/feedback',
    tryCatchWrapper(controller.handleFeedback)
  )

  router.post(
    '/completions/notes/answers',
    tryCatchWrapper(controller.handleViewSampleAnswer)
  )

  router.post(
    '/completions/notes/review',
    tryCatchWrapper(controller.handleReviewAnswer)
  )

  router.post(
    '/completions/feedback/enhanced',
    tryCatchWrapper(controller.handleViewEnhancedAnswer)
  )
  return router
}

export default aiRouter
