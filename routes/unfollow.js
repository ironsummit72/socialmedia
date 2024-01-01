const express = require('express')
const router = express.Router()
const userModel = require('../db/models/user')

router.use(isloggedIn)

router.post('/:username', async function (req, res) {
	//follow logic
	if (req.user.username !== null && req.params.username !== null) {
		const {username} = req.user
		let loggedInUserData = await userModel.findOne({username}) // following will decrease following requested user
		let requestedUserData = await userModel.findOne({username: req.params.username}) // followers will decrease  follower loggedin user

		if (loggedInUserData.following.includes(requestedUserData._id) &&requestedUserData.followers.includes(loggedInUserData._id)) {
			let newLoggedInUserData = loggedInUserData.following.filter((userID) => {
				return userID.toString() !== requestedUserData._id.toString()
			})
			loggedInUserData.following = [...newLoggedInUserData]
			await loggedInUserData.save()
			let newRequestedUserData = requestedUserData.followers.filter((userID) => {
				return userID.toString() !== loggedInUserData._id.toString()
			})
			console.log(newRequestedUserData)
			requestedUserData.followers = [...newRequestedUserData]
			await requestedUserData.save()
			res.redirect(`../profile/${req.params.username}`)
		}
	}
})

function isloggedIn(req, res, next) {
	if (req.user) {
		next()
	} else {
		res.redirect('/login')
	}
}

module.exports = router
