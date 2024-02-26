import {Router} from 'express'
import {renderCreatePostPage, renderCreateStoryPage, uploadPost, uploadStory} from '../controllers/create.controller.js'
import upload from '../middleware/multer.js'
import isloggedIn from '../middleware/auth.middleware.js'
const router = Router()
router.use(isloggedIn)

router.get('/post', renderCreatePostPage)
router.get('/story', renderCreateStoryPage)
// _____________________________ post requests____________________
router.post('/post', upload.array('posts', 6), uploadPost)
router.post('/story', upload.single('stories'), uploadStory)

export default router
