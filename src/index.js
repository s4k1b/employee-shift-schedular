import express from 'express'
import chalk from 'chalk'
import cors from 'cors'
import { connect } from './db.js'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser'

import authMiddleware from './middlewares/auth.js'
import authRoutes from './route/auth.js'
import userRoutes from './route/user.js'

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

// parse request cookies
app.use(cookieParser())

// auth middleware
app.use(authMiddleware)

// routes
app.use('/auth', authRoutes)
app.use('/user', userRoutes)

// custom error handling
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ msg: err.message })
})

app.listen(port, () => {
  console.log(chalk.green('Server is listening on port: '), chalk.green(port))
})
