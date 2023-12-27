import { checkSchema, validationResult } from 'express-validator'
import { User } from '../model/user.js'
import { processRequestBodyValidationErrors, processDatabaseActionErrors } from '../utilities/error-process.js'

const registerSchema = {
  name: {
    notEmpty: true
  },
  phone: {
    options: ['any', { strictMode: true }]
  },
  email: {
    notEmpty: true,
    isEmail: true
  },
  password: {
    notEmpty: true,
    isLength: {
      options: { min: 8 },
      errorMessage: 'Password should be minimum 8 characters long'
    }
  }
}

function bodyValidation (req, resp, next) {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    resp.status(422).send({ errors: processRequestBodyValidationErrors(result.errors) })
  } else {
    return next()
  }
}

export const registerControllers = [
  checkSchema(registerSchema),

  bodyValidation,

  async function register (req, resp) {
    try {
      await User.create(req.body)
      resp.status(200).send({ msg: `Registration Successful for user: ${req.body.username}` })
    } catch (e) {
      resp.status(422).send({ errors: [processDatabaseActionErrors(e)] })
    }
  }
]

// -----------------------------------------------------------------------------
//

const loginSchema = {
  email: {
    notEmpty: true,
    isEmail: true
  },
  password: {
    notEmpty: true
  }
}

export const loginControllers = [
  checkSchema(loginSchema),

  bodyValidation,

  async function login (req, resp) {
    const { email, password } = req.body || {}
    try {
      const user = await User.findOne({ email })
      if (await user.comparePassword(password)) {
        resp.status(200).send({ msg: 'Logged in successfully' })
      } else {
        resp.status(401).send({ errors: ['Incorrect email or password'] })
      }
    } catch (e) {
      resp.status(500).send({ errors: [`User with ${email} not found.`] })
    }
  }

]
