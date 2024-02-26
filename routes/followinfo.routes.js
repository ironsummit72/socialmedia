
import {Router} from 'express'
import {showFollowers,showFollowing,showFollowersOfOtherUser,showFollowingOfOtherUser} from '../controllers/follow.controller.js'
import isloggedIn from '../middleware/auth.middleware.js'
const router = Router()
router.use(isloggedIn)
// routes for logged in users
router.get('/followers',showFollowers)
router.get('/following',showFollowing)
// routes for other users
router.get('/followers/:username',showFollowersOfOtherUser)
router.get('/following/:username',showFollowingOfOtherUser)



export default router
