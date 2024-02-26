import {Router} from 'express'
import {getUsersProfile, searchUser} from '../controllers/user.controller.js'
import isloggedIn from '../middleware/auth.middleware.js'
const router = Router()
router.get('/:username', isloggedIn, getUsersProfile)
router.post('/:search', searchUser)
export default router
