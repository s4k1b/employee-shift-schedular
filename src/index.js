import express from 'express'
import chalk from 'chalk'
import cors from 'cors'
import authRoutes from './route/auth.js'
import { connect } from './db.js'
import { config } from 'dotenv'

// make .env variables available
config()

const port = process.env.PORT

const app = express()

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

// database connection
console.log(chalk.blue('Connecting to database ....'))
await connect()

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.use('/auth', authRoutes)

app.listen(port, () => {
  console.log(chalk.green('Server is listening on port: '), chalk.green(port))
})
