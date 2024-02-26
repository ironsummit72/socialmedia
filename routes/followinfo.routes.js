
import express ,{Router} from 'express'
import userModel from '../db/models/user.model.js'
import shuffle from '../utils/shuffle.js'
const router = Router()
router.use(isloggedIn)

// routes for logged in users

router.get('/followers', async function (req, res) {
	if (req.user!==null) {
		const {username}=req.user
		let userData=await userModel.findOne({username}).populate('followers')
		const {followers} = userData
		shuffle(followers)
		res.render('followers',{followers})
		
	}else{
		
		res.send('logged in user you have these much followers')
	}
})
router.get('/following',async function (req, res) {
	if (req.user!==null ) {
		const {username}=req.user
		let userData=await userModel.findOne({username}).populate('following')
		const {following}=userData
		shuffle(following)
		res.render('following',{following})
		
	}else{
		
		res.send('logged in user you have these much following')
	}
})

// routes for other users

router.get('/followers/:username',async function (req, res) {
	if (req.params.username!==null) {
		const {username}=req.params
		let userData=await userModel.findOne({username}).populate('followers')
		const {followers}=userData
		shuffle(followers)
		res.render('followers',{followers})
		
	}else{
		
		res.send('logged in user you have these much followers')
	}
	
	
})
router.get('/following/:username',async function (req, res) {
	if (req.params.username!==null ) {
		const {username}=req.params
		let userData=await userModel.findOne({username}).populate('following')
		const {following}=userData
		shuffle(following)
		res.render('following',{following})

	}else{

		res.send('logged in user you have these much following')
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
