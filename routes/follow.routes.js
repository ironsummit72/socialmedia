import express,{Router} from 'express'

import {followUnfollowUser} from '../controllers/follow.controller.js'
const router = Router()
router.use(isloggedIn)
router.post('/:username',followUnfollowUser)

function isloggedIn(req, res, next) {
	if (req.user) {
		next()
	} else {
		res.redirect('/login')
	}
}

export default router
