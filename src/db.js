import mongoose from 'mongoose'
import chalk from 'chalk'

export async function connect () {
  const connectionUri = process.env.MONGO_SERVER
  try {
    await mongoose.connect(connectionUri)
    console.log(chalk.green('Database connection successfull'))
  } catch (e) {
    console.log(chalk.red('Database connection failed'), e)
  }
}
