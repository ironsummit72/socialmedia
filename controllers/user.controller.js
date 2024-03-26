import userModel from '../db/models/user.model.js'
import shuffle from '../utils/shuffle.js'

async function getLoggedInUser(req, res) {
	const {username} = req.user
	const userData = await userModel.findOne({username}).populate('posts')
	if (userData !== null) {
		const {firstname, lastname, displaypicture, followers, following, covervideo,coverthumbnail,coverposition, bio, posts} = userData
		let ownProfile = false
		if (username === req.user.username) {
			ownProfile = true
		}
		const ownerpicture = await loggedInuserDetails(req.user.username)
		res.render('profile', {
			username,
			firstname,
			lastname,
			ownprofile: ownProfile,
			displaypicture,
			ownerpicture,
			followers,
			following,
			covervideo,
			coverthumbnail,	
			coverposition,	
			bio,
			posts,
			loggedInUserId: req.user.id,
		})
	} else {
		res.render('nouser', {error: 'user does not exist'})
	}
}

async function getUsersProfile(req, res) {
	const {username} = req.params
	let userData = await userModel.findOne({username}).populate('posts').populate('followers')
	if (userData !== null) {
		const {firstname, lastname, displaypicture, covervideo,coverthumbnail,coverposition, followers, following, bio, posts} = userData
		shuffle(posts)
		let ownProfile = false
		if (username === req.user.username) {
			ownProfile = true
		}
		const ownerpicture = await loggedInuserDetails(req.user.username)
		res.render('profile', {
			username,
			firstname,
			lastname,
			ownprofile: ownProfile,
			displaypicture,
			ownerpicture,
			covervideo,
			coverthumbnail,
			coverposition,
			followers,
			following,
			bio,
			posts,
			loggedInUser: req.user.username,
			loggedInUserId: req.user.id,
		})
	} else {
		res.render('nouser', {error: 'user does not exist'})
	}
}

function searchUser(req, res) {
	const {search} = req.body
	res.redirect(`/profile/${search}`)
}

async function loggedInuserDetails(username) {
	let userData = await userModel.findOne({username})
	const {displaypicture} = userData
	return displaypicture
}

export {getLoggedInUser, getUsersProfile, searchUser}
