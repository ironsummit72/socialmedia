import {Router} from 'express'
import userModel from '../db/models/user.js'
const router = Router()
router.get('/', isloggedIn, async function (req, res) {
	const {id, username} = req.user
	const likedpostsData = await userModel.findOne({_id: id}).populate('likedposts')
	const {likedposts} = likedpostsData
	res.render('likedposts', {likedposts, username})
})

function isloggedIn(req, res, next) {
	if (req.user) {
		next()
	} else {
		res.redirect('/login')
	}
}
export default router
