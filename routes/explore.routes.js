import {Router} from 'express'
import isloggedIn from '../middleware/auth.middleware.js'
import {explorePosts} from '../controllers/explore.controller.js'
const router = Router()
router.get('/', isloggedIn, explorePosts)
export default router
