import {Router} from 'express'
import {renderPhotosPageOfLoggedInUser, renderPhotosPageOfUsers} from '../controllers/posts.controller.js'
import isloggedIn from '../middleware/auth.middleware.js'
const router = Router()
router.get('/', isloggedIn, renderPhotosPageOfLoggedInUser)
router.get('/profile/:username', isloggedIn, renderPhotosPageOfUsers)
export default router
