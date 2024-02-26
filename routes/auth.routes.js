import {Router} from 'express'
let router = Router()
import { renderLoginPage,renderRegisterPage, userLogout,registerUser} from '../controllers/auth.controller.js'
import passport from 'passport'
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
router.get('/login',renderLoginPage)
router.get('/register', renderRegisterPage)
/* POST ROUTES ----------------------------------------------. */
router.post('/logout', userLogout)
router.post('/register', registerUser)
router.post('/login',passport.authenticate('local', {successRedirect: '/',failureRedirect: '/login',failureFlash:true}))

export default router;
