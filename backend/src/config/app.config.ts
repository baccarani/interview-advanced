import dotenv from 'dotenv'
dotenv.config()

interface AppConfig {
  port: number
  jsonLimit: string
  urlEncoding: boolean
  env: string
  multerFilePath: string
  loggingMode: string
}

interface AuthOConfig {
  authRequired: boolean
  auth0Logout: boolean
  secret: string
  baseURL: string
  clientID: string
  issuerBaseURL: string
  audience: string
  tokenSigningAlg: string
  domain: string
  userRoleId: string
  adminRoleId: string
}

interface DBConfig {
  url: string | undefined
}

interface GoogleOAuthConfig {
  clientId: string | undefined
  clientSecret: string | undefined
}

interface JWTConfig {
  maxAge: number
  secret: string
}

interface CorsConfig {
  origin: Array<string>
  credentials: true
  // allowedHeaders: Array<string>
  // exposedHeaders: Array<string>
}

interface BcryptConfig {
  secret: string
  salt: number
}

interface SwaggerConfig {
  username?: string
  password?: string
}

export const appConfig: AppConfig = {
  port: Number(process.env.PORT) || 8000,
  jsonLimit: '50mb',
  urlEncoding: true,
  env: process.env.NODE_ENV ?? 'dev',
  multerFilePath: '../uploads',
  loggingMode: process.env.NODE_ENV === 'prod' ? 'tiny' : 'dev',
}

const whitelist: Array<string> = [
  'https://localhost:3000',
  'http://localhost:5500/',
]

export const corsOptions: CorsConfig = {
  origin: whitelist,
  credentials: true,
  // allowedHeaders: ['Content-Type', 'Authorization'],
  // exposedHeaders: ['*', 'Authorization'],
}

export const authOConfig: AuthOConfig = {
  authRequired: true,
  auth0Logout: true,
  secret:
    process.env.AUTH_0_SECRET ?? '4ece645ccc35abd2b8d8d7a43f870e6aa0cdf663',
  baseURL: process.env.BASE_URL ?? 'http://127.0.0.1:5500',
  clientID: process.env.AUTH_0_CLIENT_ID ?? '',
  issuerBaseURL: process.env.AUTH_0_ISSUER_BASE_URL ?? '',
  tokenSigningAlg: process.env.AUTH_0_TOKEN_ALGO ?? 'RS256',
  audience: process.env.AUTH_0_AUDIENCE ?? '',
  domain: process.env.AUTH_0_DOMAIN ?? '',
  userRoleId: process.env.AUTH_0_USER_ROLE ?? '',
  adminRoleId: process.env.AUTH_0_ADMIN_ROLE ?? '',
}

export const dbConfig: DBConfig = {
  url:
    process.env.NODE_ENV === 'dev'
      ? process.env.MONGO_LOCAL
      : process.env.MONGO_PROD,
}

export const googleAuthConfig: GoogleOAuthConfig = {
  clientId:
    process.env.NODE_ENV === 'dev'
      ? process.env.DEV_GOOGLE_OAUTH_AUDIENCE
      : process.env.GOOGLE_OAUTH_AUDIENCE,
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
}

export const jwtConfig: JWTConfig = {
  maxAge: 10000,
  secret: process.env.JWT_SECRET ?? '',
}

export const authConfig = {
  userRole: process.env.USER_ROLE || 'missing_user_role',
  adminRole: process.env.ADMIN_ROLE || 'missing_admin_role',
  aSecret: process.env.A_SECRET || 'missing_admin_secret',
}

export const bcryptConfig: BcryptConfig = {
  secret: process.env.BCRYPT_SECRET || 'Missing Secret',
  salt: Number(process.env.BCRYPT_SALT) || 10,
}

export const swaggerConfig: SwaggerConfig = {
  username: process.env.SWAGGER_USERNAME,
  password: process.env.SWAGGER_PASSWORD,
}

export const testingConfig = {
  testEmail: process.env.TESTING_EMAIL ?? '',
}
