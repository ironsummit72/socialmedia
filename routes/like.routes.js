import {Router} from 'express'
import isloggedIn from '../middleware/auth.middleware.js'
import {addLike, showLikedBy} from '../controllers/likes.controller.js'
const router = Router()

// handle get requests
router.use(isloggedIn)
router.get('/likes/:postId', showLikedBy)
// handle post requests
router.post('/like/:postIdUser', addLike)
export default router
