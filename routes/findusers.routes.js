import {Router} from 'express'
const router = Router()
import userModel from '../db/models/user.model.js'
import shuffle from '../utils/shuffle.js'

router.get('/', isloggedIn, async (req, res) => {
	const users = await userModel.find({})
	const filterUserData = users.filter((items) => {
		return items.id !== req.user.id
	})
	shuffle(users)
	res.render('findusers', {users: filterUserData})
})

function isloggedIn(req, res, next) {
	if (req.user) {
		next()
	} else {
		res.redirect('/login')
	}
}

export default router
