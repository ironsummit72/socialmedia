import {generateHash} from '../utils/hashgen.js'
import userModel from '../db/models/user.model.js'

function renderLoginPage(req, res) {
	res.render('login', {error: req.flash('error')})
}
function renderRegisterPage(req, res) {
	res.render('register')
}
function userLogout(req, res, next) {
	req.logout(function (err) {
		if (err) {
			return next(err)
		}
		res.redirect('/')
	})
}

async function registerUser(req, res) {
	const {username, password, cpassword, firstname, lastname, email} = req.body
	if (password === cpassword) {
		const {hash, salt} = generateHash(password)
		await userModel.create({
			username,
			password: `${hash}.${salt}`,
			firstname,
			lastname,
			email,
		})
		res.send('successfully registered')
	}
}
export {renderLoginPage, renderRegisterPage, userLogout, registerUser}
