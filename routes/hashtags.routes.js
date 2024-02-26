import {Router} from 'express'
import {showPostRelatedToHashTags} from '../controllers/posts.controller.js'
const router = Router()
router.get('/:tagName', showPostRelatedToHashTags)
export default router
