import {Router} from 'express'
import isloggedIn from '../middleware/auth.middleware.js'
import userModel from '../db/models/user.model.js'
import { ownProfileTagged, userProfileTagged } from '../controllers/tagged.controller.js'
const router = Router()
router.get('/', isloggedIn, ownProfileTagged)
router.get('/profile/:username', isloggedIn,userProfileTagged)
export default router
