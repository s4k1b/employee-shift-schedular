import { Router } from 'express'
import { loginControllers, logoutControllers, registerControllers } from '../controller/auth.js'

const router = Router()

router.post('/register', registerControllers)
router.post('/login', loginControllers)
router.post('/logout', logoutControllers)

export default router
