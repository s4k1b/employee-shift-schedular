import { Router } from 'express'
import { loginControllers, registerControllers } from '../controller/auth.js'

const router = Router()

router.post('/register', registerControllers)
router.post('/login', loginControllers)

export default router
