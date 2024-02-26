import {Router} from 'express'
const router = Router()
import isloggedIn from '../middleware/auth.middleware.js'
import {renderReelsPageOfLoggedInUser, renderReelsPageOfUsers} from '../controllers/posts.controller.js'
router.get('/', isloggedIn, renderReelsPageOfLoggedInUser)
router.get('/profile/:username', isloggedIn, renderReelsPageOfUsers)
export default router
