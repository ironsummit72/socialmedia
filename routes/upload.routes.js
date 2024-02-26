import {Router} from 'express'
const router = Router()
import upload from '../middleware/multer.js'
import isloggedIn from '../middleware/auth.middleware.js'
import fs from 'fs'
import {uploadCoverPicture, uploadDisplayPicture} from '../controllers/upload.controller.js'
import path from 'path'
const baseDir = './uploads'
const subdirectories = ['displaypicture', 'coverpicture', 'stories', 'posts', 'posts/images', 'posts/videos']

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
router.use(isloggedIn)
router.get('/dp', function (req, res) {
	res.render('uploadprofile')
})
router.get('/cover', function (req, res) {
	res.render('uploadcover')
})
router.post('/dp', upload.single('displaypicture'), uploadDisplayPicture)

router.post('/cover', upload.single('coverpicture'),uploadCoverPicture)

export default router
