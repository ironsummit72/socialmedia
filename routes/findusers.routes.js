import {Router} from 'express'
const router = Router()
import {findUsers} from '../controllers/find.controller.js'
import isloggedIn from '../middleware/auth.middleware.js'
router.get('/', isloggedIn, findUsers)
export default router
