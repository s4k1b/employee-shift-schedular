import { model } from 'mongoose'
import { userSchema } from '../schema/user.js'

export const User = model('User', userSchema)

export async function getUserInfo (email) {
  const userInstance = await User.findOne({ email })
  return userInstance.info()
}
