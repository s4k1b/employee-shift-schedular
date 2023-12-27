import { model } from 'mongoose'
import { userSchema } from '../schema/user.js'

export const User = model('User', userSchema)
