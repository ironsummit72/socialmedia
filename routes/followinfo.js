const express = require('express')
const router = express.Router()
const userModel = require('../db/models/user')
router.use(isloggedIn)

// routes for logged in users

router.get('/followers', async function (req, res) {
	if (req.user!==null) {
		const {username}=req.user
		let userData=await userModel.findOne({username}).populate('followers')
		console.log(userData)
		res.render('followers',{followers:userData.followers})
		
	}else{
		
		res.send('logged in user you have these much followers')
	}
})
router.get('/following',async function (req, res) {
	if (req.user!==null ) {
		const {username}=req.user
		let userData=await userModel.findOne({username}).populate('following')
		console.log(userData)
		res.render('following',{following:userData.following})
		
	}else{
		
		res.send('logged in user you have these much following')
	}
})

// routes for other users

router.get('/followers/:username',async function (req, res) {
	if (req.params.username!==null) {
		const {username}=req.params
		let userData=await userModel.findOne({username}).populate('followers')
		console.log(userData)
		res.render('followers',{followers:userData.followers})
		
	}else{
		
		res.send('logged in user you have these much followers')
	}
	
	
})
router.get('/following/:username',async function (req, res) {
	if (req.params.username!==null ) {
		const {username}=req.params
		let userData=await userModel.findOne({username}).populate('following')
		console.log(userData)
		res.render('following',{following:userData.following})

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

module.exports = router
