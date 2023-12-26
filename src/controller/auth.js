import { checkSchema, validationResult } from 'express-validator'

const registerSchema = {
  name: {
    notEmpty: true
  },
  username: {
    notEmpty: true
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

export const registerControllers = [
  checkSchema(registerSchema),

  function register (req, resp) {
    try {
      validationResult(req).throw()
      resp.status(200).send({ msg: `Registration Successful for user: ${req.body.username}` })
    } catch (e) {
      resp.status(500).send({ errors: e.mapped() })
    }
  }
]
