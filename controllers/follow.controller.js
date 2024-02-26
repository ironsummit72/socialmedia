import userModel from '../db/models/user.model.js'
import shuffle from '../utils/shuffle.js'
async function followUnfollowUser(req, res) {
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
			if (
				loggedInUserData.following.includes(requestedUserData._id) &&
				requestedUserData.followers.includes(loggedInUserData._id)
			) {
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
}
async function showFollowers(req, res) {
	if (req.user !== null) {
		const {username} = req.user
		let userData = await userModel.findOne({username}).populate('followers')
		const {followers} = userData
		shuffle(followers)
		res.render('followers', {followers})
	} else {
		res.send('logged in user you have these much followers')
	}
}
async function showFollowing(req, res) {
	if (req.user !== null) {
		const {username} = req.user
		let userData = await userModel.findOne({username}).populate('following')
		const {following} = userData
		shuffle(following)
		res.render('following', {following})
	} else {
		res.send('logged in user you have these much following')
	}
}
async function showFollowersOfOtherUser(req, res) {
	if (req.params.username !== null) {
		const {username} = req.params
		let userData = await userModel.findOne({username}).populate('followers')
		const {followers} = userData
		shuffle(followers)
		res.render('followers', {followers})
	} else {
		res.send('logged in user you have these much followers')
	}
}
async function showFollowingOfOtherUser(req, res) {
	if (req.params.username !== null) {
		const {username} = req.params
		let userData = await userModel.findOne({username}).populate('following')
		const {following} = userData
		shuffle(following)
		res.render('following', {following})
	} else {
		res.send('logged in user you have these much following')
	}
}

export {followUnfollowUser, showFollowers, showFollowing, showFollowersOfOtherUser, showFollowingOfOtherUser}
