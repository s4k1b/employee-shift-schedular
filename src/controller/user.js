import { getUserInfo } from '../model/user.js'

export const userGetControllers = [
  async function user (req, res, next) {
    try {
      const user = await getUserInfo(res.locals.userEmail)
      res.status(200).send(user)
    } catch (e) {
      next(e)
    }
  }
]
