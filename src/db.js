import mongoose from 'mongoose'
import chalk from 'chalk'

export async function connect () {
  const connectionUri = `mongodb+srv://${process.env.MONGO_EMPLOYEE_SHIFT_SCHEDULAR_USER}:${process.env.MONGO_EMPLOYEE_SHIFT_SCHEDULAR_PASS}@employee-shift-schedula.a1yszmj.mongodb.net/?retryWrites=true&w=majority`
  try {
    await mongoose.connect(connectionUri)
    console.log(chalk.green('Database connection successfull'))
  } catch (e) {
    console.log(chalk.red('Database connection failed'), e)
  }
}
