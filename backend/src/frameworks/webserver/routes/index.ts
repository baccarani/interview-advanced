import { Application } from 'express'
import analyticsRouter from './analytics.router'
import authRouter from './auth.router'
import chartsRouter from './charts.router'
import feedbackTranscriptRouter from './feedback_transcript.router'
import genericRouter from './generic.router'
import interviewRoute from './interview.router'
import interviewTranscriptRouter from './interview_transcript.router.'
import profileRouter from './profile.router'
import quotaRouter from './quota.router'
import aiRouter from './ai.router'

export default (app: Application, express: any) => {
  // Auth Routes
  app.use('/api/v1/auth', authRouter(express))

  // Profile Routes - Auth Required
  app.use('/api/v1/profile', profileRouter(express))

  // Quota Routes - Auth Required
  app.use('/api/v1/quota', quotaRouter(express))

  // Interview Routes - Auth Required
  app.use('/api/v1/users/:user_id/interviews', interviewRoute(express))

  // Interview Transcripts Routes - Auth Required
  app.use(
    '/api/v1/users/:user_id/transcripts/interviews',
    interviewTranscriptRouter(express)
  )

  // Feedback Transcripts Routes - Auth Required
  app.use(
    '/api/v1/users/:user_id/transcripts/feedbacks',
    feedbackTranscriptRouter(express)
  )

  // Charts Routes - Auth Required
  app.use('/api/v1/users/:user_id/charts', chartsRouter(express))

  // Analytics Routes - Auth Required
  app.use('/api/v1/users/:user_id/analytics', analyticsRouter(express))

  // AI Routes - Open Routes - No Auth
  app.use('/api/v1/ai', aiRouter(express))

  // Generic Routes
  app.use('/api/v1', genericRouter(express))
}
