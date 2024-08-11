import { Document, Schema, model } from 'mongoose'

export interface Profile extends Document {
  name: string
  sub: string
  email: string
  picture: string
  // role_id: string
  // lastLogin: string
  // lastLogout: string
  // recieveEmails: boolean
  // refreshToken: string
}

const profileSchema = new Schema<Profile>(
  {
    name: { type: String, default: '' },
    sub: { type: String, required: true },
    // role_id: { type: String, default: 'Test', required: true },
    email: { type: String, required: true },
    picture: { type: String, default: '' },
    // recieveEmails: { type: Boolean, default: false },
    // lastLogin: { type: String, default: new Date().toISOString() },
    // lastLogout: { type: String, default: 'N/A' },
    // refreshToken: { type: String },
  },
  { timestamps: true }
)

export default model<Profile>('profile', profileSchema)
