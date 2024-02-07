import express ,{Router} from 'express'
const router = Router()
import userModel from '../db/models/user.js'

router.get('/', isloggedIn, async function (req, res) {
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
})
router.get('/profile/:username', isloggedIn, async function (req, res) {
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
			loggedInUser:req.user.username,
			loggedInUserId:req.user.id,
		})
	} else {
		res.render('nouser', {error: 'user does not exist'})
	}
})

async function loggedInuserDetails(username) {
	let userData = await userModel.findOne({username})
	const {displaypicture} = userData
	return displaypicture
}
function isloggedIn(req, res, next) {
	if (req.user) {
		next()
	} else {
		res.redirect('/login')
	}
}
export default router
