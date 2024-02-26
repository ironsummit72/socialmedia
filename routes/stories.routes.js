import {Router} from 'express'
import { renderStoriesOfLoggedInUser, renderStoriesOfUsers,isStoryAvailable } from '../controllers/story.controller.js';
const router = Router()
router.get('/', renderStoriesOfLoggedInUser)
router.get('/:username',renderStoriesOfUsers);
router.get('/api/available/:username',isStoryAvailable);
export default router
