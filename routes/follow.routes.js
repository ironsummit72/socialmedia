import express,{Router} from 'express'
import userModel from '../db/models/user.model.js'
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
			res.status(200).json({isFollowing: true})
		} else {
			if (loggedInUserData.following.includes(requestedUserData._id) &&requestedUserData.followers.includes(loggedInUserData._id)) {
				let newLoggedInUserData = loggedInUserData.following.filter((userID) => {
					return userID.toString() !== requestedUserData._id.toString()
				})
				loggedInUserData.following = [...newLoggedInUserData]
				await loggedInUserData.save()
				let newRequestedUserData = requestedUserData.followers.filter((userID) => {
					return userID.toString() !== loggedInUserData._id.toString()
				})
				
				requestedUserData.followers = [...newRequestedUserData]
				await requestedUserData.save()
				res.status(200).json({isFollowing: false})
			}
			
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
