let express = require('express')
let router = express.Router()
const { generateHash } = require('../utils/hashgen')
const userModel = require('../db/models/user')
const passport = require('passport')

passport.serializeUser(function (user, cb) {
	// eslint-disable-next-line no-undef
	process.nextTick(function () {
		cb(null, { id: user.id, username: user.username })
	})
})

passport.deserializeUser(function (user, cb) {
	// eslint-disable-next-line no-undef
	process.nextTick(function () {
		return cb(null, user)
	})
})

/* GET ROUTES ----------------------------------------------. */
router.get('/login', function (req, res) {
	res.render('login',{error:req.flash('error')})
})

router.get('/register', function (req, res) {
	res.render('register')
})

router.post('/logout', function (req, res, next) { 
	req.logout(function (err) {
		if (err) {
			return next(err)
		}
		res.redirect('/')
	})
})

router.post('/register', async function (req, res) {
	const { username, password, cpassword, firstname, lastname, email } = req.body
	if (password === cpassword) {
		const { hash, salt } = generateHash(password)
		await userModel.create({
			username,
			password: `${hash}.${salt}`,
			firstname,
			lastname,
			email,
		})
		res.send('successfully registered')
	}
})
router.post('/login',passport.authenticate('local', {successRedirect: '/',failureRedirect: '/login',failureFlash:true}))

module.exports = router
