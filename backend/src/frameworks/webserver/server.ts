import { Express } from 'express'
import { Mongoose } from 'mongoose'
import { Server } from 'http'

const serverConfig = (
  app: Express,
  mongoose: Mongoose,
  serverInit: Server,
  config: any
) => {
  const startServer = () => {
    serverInit.listen(config.port, config.ip)

    serverInit.on('listening', () => {
      console.log(
        `[Server]: Express server listening on http://localhost:${
          config.port
        }, in ${app.get('env')} mode\n`
      )
      console.log(
        `[Server]: Ping at http://localhost:${config.port}/api/v1/ping\n`
      )
      console.log(
        `[Server]: Health check at http://localhost:${config.port}/api/v1/health\n`
      )
    })

    const shutDownHandler = (signal: NodeJS.Signals) => {
      console.info(`[Server]: Signal Recieved ${signal}`)
      console.info('[Server]: Shut-Down Initiated')
      serverInit.close((err) => {
        if (err) {
          console.log(err)
          process.exit(0)
        } else {
          mongoose.connection
            .close(false)
            .then(() => {
              console.info(`[Server]: Mongoose Connection Closed Successfully`)
            })
            .catch((e) =>
              console.error(
                `[Server]: Mongoose Connection could not be closed! Reason -${e.message}`
              )
            )
          console.info(`[Server]: Server Shut-Down Successful`)
          process.exit(0)
        }
      })
    }

    process.on('SIGINT', shutDownHandler)
    process.on('SIGTERM', shutDownHandler)
    process.on('SIGQUIT', shutDownHandler)

    process.addListener('uncaughtException', (error, origin) => {
      console.log(`[Server]: Uncaught Expection - ${error.message}`)
      console.log(`[Server]: Error Originated at ${origin}`)
      process.emit('SIGINT')
    })

    process.addListener('unhandledRejection', (reason, promise) => {
      console.log(`[Server]: Unhandler Rejection - ${reason}`)
    })
  }

  return { startServer }
}

export default serverConfig
