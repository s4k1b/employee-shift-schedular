import { Router } from 'express'
import { registerControllers } from '../controller/auth.js'

const router = Router()

router.post('/register', registerControllers)

export default router
