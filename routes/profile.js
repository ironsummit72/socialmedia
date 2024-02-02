import express ,{Router} from 'express'
const router = Router()
import userModel from '../db/models/user.js'

router.get('/:username', isloggedIn, async function (req, res) {
	const {username} = req.params
	let userData = await userModel.findOne({username}).populate('posts').populate('followers')
	if (userData !== null) {
		const {firstname, lastname, displaypicture, coverpicture, followers, following, bio, posts} = userData
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
			coverpicture,
			followers,
			following,
			bio,
			posts,
			loggedInUser:req.user.username,
			loggedInUserId:req.user.id,
		})
	} else {
		res.render('nouser', {error: 'user does not exist'})
	}
})

router.post('/:search', (req, res) => {
	const {search} = req.body
	res.redirect(`/profile/${search}`)
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
