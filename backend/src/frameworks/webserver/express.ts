import express, { Application } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import config from '../../config/config'

const expressConfig = (app: Application) => {
  // CORS
  app.use(
    cors({
      credentials: true,
      origin: config.express.corsURLS,
    })
  )

  // URL Encoding
  app.use(express.urlencoded({ extended: config.express.urlEncoding }))

  // JSON Parsing
  app.use(express.json({ limit: config.express.jsonLimit }))

  // Cookie Parser
  app.use(cookieParser(config.express.cookieSecret))

  // Helmet Setup
  app.use(helmet({ frameguard: false }))

  // CORS - extension

  app.use((req, res, next) => {
    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'http://some-accepted-origin');
    // Request methods you wish to allow
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    )
    // Request headers you wish to allow
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With, Content-type, Authorization, Cache-control, Pragma'
    )
    // Pass to next layer of middleware
    next()
  })

  // Request Logging - Morgan Setup
  app.use(morgan(config.express.loggingMode))
}

export default expressConfig
