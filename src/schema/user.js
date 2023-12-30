import { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

function removePassFromUser (user) {
  const userWithoutPass = { ...user }
  delete userWithoutPass.password
  return userWithoutPass
}

export const userSchema = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  phone: { type: Number },
  role: { type: [String], default: ['employee'] },
  password: { type: String }
}, {
  methods: {
    async comparePassword (candidatePassword) {
      const match = await bcrypt.compare(candidatePassword, this.password)
      return match
    },
    info () {
      const user = removePassFromUser(this.toJSON())
      return user
    }
  }
})

// save password by hashing
userSchema.pre('save', async function (next) {
  try {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
  } catch (e) {
    next(e)
  }
})
