import {Router} from 'express'
import {getLoggedInUser} from '../controllers/user.controller.js'
import isloggedIn from '../middleware/auth.middleware.js'
let router = Router()

/* GET home page. */
router.get('/cover', function (req, res) {
	res.redirect('/upload/cover')
})
router.get('/dp', function (req, res) {
	res.redirect('/upload/dp')
})

router.get('/', isloggedIn, getLoggedInUser)

export default router
