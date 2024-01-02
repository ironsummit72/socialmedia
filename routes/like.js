const express = require('express')
const router = express.Router()
const userModel = require('../db/models/user')
const postModel = require('../db/models/post')
// handle get requests

router.use(isloggedIn)
router.get('/likes/:postId', async function (req, res) {
	const {postId} = req.params
	if (postId !== null) {
		let postData = await postModel.findOne({_id: postId}).populate('likes')
		const {likes} = postData
		res.render('likes', {likes})
	}
})
// handle post requests

router.post('/like/:postId', async function (req, res) {
	const {postId} = req.params
	const {username} = req.user

	let userData = await userModel.findOne({username})
	let postData = await postModel.findOne({_id: postId})
	if (!userData.likedposts.includes(postData._id) && !postData.likes.includes(userData._id)) {
		userData.likedposts.push(postId)
		await userData.save()
		postData.likes.push(userData._id)
		await postData.save()
		res.redirect('../')
	} else {
		console.log(' likes found')
		res.send('you already liked this post')
	}
	// userData.likedposts.push(postId)
	// await userData.save()
	// postData.likes.push(userData._id)
	// await postData.save()
})

function isloggedIn(req, res, next) {
	if (req.user) {
		next()
	} else {
		res.redirect('/login')
	}
}

module.exports = router
