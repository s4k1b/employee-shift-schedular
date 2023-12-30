import { checkSchema, validationResult } from 'express-validator'
import { User } from '../model/user.js'

const registerSchema = {
  name: {
    notEmpty: true
  },
  phone: {
    isMobilePhone: {
      options: ['any', { strictMode: true }]
    }
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
  try {
    validationResult(req).throw()
    next()
  } catch (e) {
    next(e)
  }
}

async function emailExistsValidation (req, resp, next) {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (req.url === '/register') {
      if (user) {
        next(new Error('Email already exists'))
      } else next()
    } else if (req.url === '/login') {
      if (user) {
        resp.locals.user = user
        next()
      } else {
        const error = new Error('Email not registered')
        error.statusCode = 404
        next(error)
      }
    }
  } catch (e) {
    next(e)
  }
}

export const registerControllers = [
  checkSchema(registerSchema),

  bodyValidation,

  emailExistsValidation,

  async function register (req, resp, next) {
    try {
      await User.create(req.body)
      resp.status(200).send({ msg: 'Registration Successful' })
    } catch (e) {
      next(e)
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

  emailExistsValidation,

  async function login (req, resp, next) {
    const { password } = req.body || {}
    const { user } = resp.locals
    try {
      if (await user.comparePassword(password)) {
        resp.append('Set-Cookie', 'jwt=abcd; Domain=localhost; HttpOnly; SameSite: Strict')
        resp.status(200).send({ msg: 'Logged in successfully' })
      } else {
        const error = new Error('Incorrect email or password')
        error.statusCode = 401
        error.name = 'Unauthorized'
        next(error)
      }
    } catch (e) {
      next(e)
    }
  }

]
