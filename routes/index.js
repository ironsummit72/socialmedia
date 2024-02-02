import express ,{Router} from 'express'
import userModel from '../db/models/user.js'
let router = Router()

/* GET home page. */
router.get('/cover', function (req, res) {
	res.redirect('/upload/cover')
})
router.get('/dp', function (req, res) {
	res.redirect('/upload/dp')
})

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
		res.render('profile', {
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
