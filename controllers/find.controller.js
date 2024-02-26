import userModel from '../db/models/user.model.js'
import shuffle from '../utils/shuffle.js'
async function findUsers(req, res) {
	const users = await userModel.find({})
	const filterUserData = users.filter((items) => {
		return items.id !== req.user.id
	})
	shuffle(users)
	res.render('findusers', {users: filterUserData})
}
export {findUsers}
