import {Router} from 'express'
import postModel from '../db/models/post.model.js'
const router = Router()

router.get('/:postId', isloggedIn, async function (req, res) {
	const {postId} = req.params
	if (postId !== null) {
		const postData = await postModel.findOne({_id: postId}).populate('user')
		res.render('viewpost', {postData, loggedInUser: req.user.username, loggedInUserId: req.user.id})
	}
})
function isloggedIn(req, res, next) {
	if (req.user) {
		next()
	} else {
		res.redirect('/login')
	}
}

export default router
