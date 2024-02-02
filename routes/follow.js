import express,{Router} from 'express'
import userModel from '../db/models/user.js'
const router = Router()
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
			res.status(200).redirect(`../profile/${req.params.username}`)
		} else {
			res.send('you are already following ' + req.params.username)
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

export default router
