import { createServer } from 'http'
import express from 'express'
import mongoose from 'mongoose'
import config from './config/config'
import expressConfig from './frameworks/webserver/express'
import serverConfig from './frameworks/webserver/server'
import routes from './frameworks/webserver/routes'
import { connection } from './frameworks/database/mongo/connection'
import {
  defaultErrorHandler,
  routeNotFoundErrorHandler,
} from './frameworks/webserver/middlerware/error.middleware'

const app = express()
const server = createServer(app)

expressConfig(app)
serverConfig(app, mongoose, server, config).startServer()

connection(mongoose, config, {
  autoIndex: false,
  connectTimeoutMS: 1000,
}).connectToMongo()

routes(app, express)

app.use(routeNotFoundErrorHandler)

app.use(defaultErrorHandler)

export default app
