import {Router} from 'express'
import { renderLikedPostsOfLoggedInUser } from '../controllers/likes.controller.js'
import isloggedIn from '../middleware/auth.middleware.js'
const router = Router()
router.get('/', isloggedIn,renderLikedPostsOfLoggedInUser)
export default router
