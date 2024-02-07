import express ,{Router} from 'express'
const router = Router()
import userModel from '../db/models/user.js'
import upload from '../middleware/multer.js'
import fs from 'fs'
router.use(isloggedIn)


import path from 'path'
const baseDir = './uploads'
const subdirectories = [
	'displaypicture',
	'coverpicture',
	'posts',
	'posts/images',
	'posts/videos',
]

try {
	// Check if the base directory already exists
	if (!fs.existsSync(baseDir)) {
		fs.mkdirSync(baseDir)
		console.log(`${baseDir} directory is created.`)
	} else {
		console.log('Directory already exists.')
	}

	// Create subdirectories
	subdirectories.forEach((subdir) => {
		const fullPath = path.join(baseDir, subdir)

		if (!fs.existsSync(fullPath)) {
			fs.mkdirSync(fullPath)
			console.log(`${fullPath} directory is created.`)
		} else {
			console.log(`${fullPath} directory already exists.`)
		}
	})
} catch (err) {
	console.error(err)
}
router.get('/dp', function (req, res) {
	res.render('uploadprofile')
})
router.get('/cover', function (req, res) {
	res.render('uploadcover')
})

router.post('/dp', upload.single('displaypicture'), async function (req, res) {
	const { path } = req.file
	const { username } = req.user

	let pattern = /uploads/g
	let resultString = path.replace(pattern, '')
	await userModel.updateOne(
		{ username },
		{ $set: { displaypicture: resultString } }
	)
	res.redirect('/')
})

router.post('/cover', upload.single('coverpicture'), async function (req, res) {
	const { path } = req.file
	const { username } = req.user
	let pattern = /uploads/g
	let resultString = path.replace(pattern, '')
	const { bio } = req.body
	if (bio === undefined) {
		let userData = await userModel.updateOne(
			{ username },
			{ $set: { coverpicture: resultString } }
		)
		res.send(userData)
	} else {
		await userModel.updateOne(
			{ username },
			{ $set: { coverpicture: resultString, bio: bio } }
		)
		res.redirect('/')
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
