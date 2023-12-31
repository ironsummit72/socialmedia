const express = require('express')
const router = express.Router()
const userModel = require('../db/models/user')

router.use(isloggedIn)

router.post('/:username', async function (req, res) {
	//follow logic
	if (req.user.username !== null && req.params.username !== null) {
		const {username} = req.user
		let loggedInUserData = await userModel.findOne({username}) // following will increase following requested user
		let requestedUserData = await userModel.findOne({username: req.params.username}) // followers will increase  follower loggedin user
		if (!loggedInUserData.following.includes(requestedUserData._id)) {
			loggedInUserData.following.push(requestedUserData._id)
			await loggedInUserData.save()
			requestedUserData.followers.push(loggedInUserData._id)
			await requestedUserData.save()
			res.status(200).send('followed')
		} else {
			res.send('you are already following ' + req.params.username)
		}
		//res.send('followed')   //TODO: will do something later
	}

	const {username} = req.params
	console.log(username)
	//TODO: write follow logic here
})

function isloggedIn(req, res, next) {
	if (req.user) {
		next()
	} else {
		res.redirect('/login')
	}
}

module.exports = router
