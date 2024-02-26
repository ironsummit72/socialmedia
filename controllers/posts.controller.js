import userModel from '../db/models/user.model.js'
import tagsModel from '../db/models/tags.model.js'
async function renderPhotosPageOfLoggedInUser(req, res) {
	const {username} = req.user
	const userData = await userModel.findOne({username}).populate('posts')
	if (userData !== null) {
		const {firstname, lastname, displaypicture, followers, following, coverpicture, bio, posts} = userData
		let ownProfile = false
		if (username === req.user.username) {
			ownProfile = true
		}
		const ownerpicture = await loggedInuserDetails(req.user.username)
		res.render('photos', {
			username,
			firstname,
			lastname,
			ownprofile: ownProfile,
			displaypicture,
			ownerpicture,
			followers,
			following,
			coverpicture,
			bio,
			posts,
		})
	} else {
		res.render('nouser', {error: 'user does not exist'})
	}
}

async function renderPhotosPageOfUsers(req, res) {
	const {username} = req.params
	const userData = await userModel.findOne({username}).populate('posts')
	if (userData !== null) {
		const {firstname, lastname, displaypicture, followers, following, coverpicture, bio, posts} = userData
		let ownProfile = false
		if (username === req.user.username) {
			ownProfile = true
		}
		const ownerpicture = await loggedInuserDetails(req.user.username)
		res.render('photos', {
			username,
			firstname,
			lastname,
			ownprofile: ownProfile,
			displaypicture,
			ownerpicture,
			followers,
			following,
			coverpicture,
			bio,
			posts,
			loggedInUser: req.user.username,
			loggedInUserId: req.user.id,
		})
	} else {
		res.render('nouser', {error: 'user does not exist'})
	}
}

async function renderReelsPageOfLoggedInUser(req, res) {
	const {username} = req.user
	const userData = await userModel.findOne({username}).populate('posts')
	if (userData !== null) {
		const {firstname, lastname, displaypicture, followers, following, coverpicture, bio, posts} = userData
		let ownProfile = false
		if (username === req.user.username) {
			ownProfile = true
		}
		const ownerpicture = await loggedInuserDetails(req.user.username)
		res.render('reels', {
			username,
			firstname,
			lastname,
			ownprofile: ownProfile,
			displaypicture,
			ownerpicture,
			followers,
			following,
			coverpicture,
			bio,
			posts,
		})
	} else {
		res.render('nouser', {error: 'user does not exist'})
	}
}
async function renderReelsPageOfUsers(req, res) {
	const {username} = req.params
	const userData = await userModel.findOne({username}).populate('posts')
	if (userData !== null) {
		const {firstname, lastname, displaypicture, followers, following, coverpicture, bio, posts} = userData
		let ownProfile = false
		if (username === req.user.username) {
			ownProfile = true
		}
		const ownerpicture = await loggedInuserDetails(req.user.username)
		res.render('reels', {
			username,
			firstname,
			lastname,
			ownprofile: ownProfile,
			displaypicture,
			ownerpicture,
			followers,
			following,
			coverpicture,
			bio,
			posts,
			loggedInUser: req.user.username,
			loggedInUserId: req.user.id,
		})
	} else {
		res.render('nouser', {error: 'user does not exist'})
	}
}

async function showPostRelatedToHashTags(req, res) {
	const {tagName} = req.params
	const tagData = await tagsModel.findOne({tagName}).populate('posts')
	if (tagData !== null) {
		const {posts} = tagData
		res.render('hashtag', {posts, tagName})
	} else {
		res.render('nohashtag', {tagName})
	}
}

async function loggedInuserDetails(username) {
	let userData = await userModel.findOne({username})
	const {displaypicture} = userData
	return displaypicture
}
export {
	renderPhotosPageOfLoggedInUser,
	renderPhotosPageOfUsers,
	renderReelsPageOfLoggedInUser,
	renderReelsPageOfUsers,
	showPostRelatedToHashTags,
}
