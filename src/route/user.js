import { Router } from 'express'
import { userGetControllers } from '../controller/user.js'

const router = new Router()

router.get('/', userGetControllers)

export default router
