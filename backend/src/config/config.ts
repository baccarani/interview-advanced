import dotenv from 'dotenv'
dotenv.config()

interface Google {
  clientId: string
  clientSecret: string
  aiAPIKey: string
  aiModelName: string
}

interface Mongo {
  uri: string
}

interface Express {
  port: number
  jsonLimit: string
  urlEncoding: boolean
  env: string
  multerFilePath: string
  loggingMode: string
  corsURLS: Array<string>
  cookieSecret: string
}

interface OpenAI {
  apiKey: string
}

interface Config {
  port: number
  ip: string
  mongo: Mongo
  jwtSecret: string
  express: Express
  google: Google
  openai: OpenAI
}

const config: Config = {
  port: Number(process.env.PORT) || 1234,
  ip: process.env.HOST || '0.0.0.0',
  mongo: {
    uri:
      (process.env.NODE_ENV === 'dev'
        ? process.env.MONGO_LOCAL
        : process.env.MONGO_PROD) || 'missing_uri',
  },
  jwtSecret: process.env.JWT_SECRET || 'jkl!±@£!@ghj1237',
  express: {
    port: Number(process.env.PORT) || 8000,
    jsonLimit: '50mb',
    urlEncoding: true,
    env: process.env.NODE_ENV ?? 'dev',
    multerFilePath: '../uploads',
    loggingMode: process.env.NODE_ENV === 'prod' ? 'tiny' : 'dev',
    corsURLS: process.env.CORS_URLS?.split(',').filter(
      (node) => node !== ''
    ) || ['http://localhost:3000'],
    cookieSecret: process.env.COOKIE_SECRET
      ? process.env.COOKIE_SECRET
      : 'missing_secret',
  },
  google: {
    clientId:
      process.env.GOOGLE_OAUTH_AUDIENCE || 'Missing Google Oauth Audience',
    clientSecret:
      process.env.GOOGLE_OAUTH_CLIENT_SECRET || 'Missing Google OAUTH secret',
    aiAPIKey: process.env.GOOGLE_AI_API_KEY || 'Missing Google Ai API Key',
    aiModelName: process.env.GOOGLE_AI_MODEL || 'Missing AI Model',
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY || 'Missing OpenAI API Key',}
}

export default config
