import {Router} from 'express'
const router = Router()
import upload from '../middleware/multer.js'
import isloggedIn from '../middleware/auth.middleware.js'
import fs from 'fs'
import {uploadCoverPicture, uploadDisplayPicture} from '../controllers/upload.controller.js'
import path from 'path'
import userModel from '../db/models/user.model.js'
const baseDir = './uploads'
const subdirectories = ['displaypicture','coverthumbnail', 'covervideo', 'stories', 'posts', 'posts/images', 'posts/videos']

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
router.patch('/coverpos/:pos',async(req,res)=>{
	//const coverposition=await userModel.findOne({username:req.user.username}).coverposition
	console.log(req.params?.pos);
	const updateCoverpos=await userModel.updateOne({username:req.user.username},{$set:{coverposition:req.params.pos}})
	res.json({
	updateCoverpos
	})
})
router.patch('/coverpos',async(req,res)=>{
	//const coverposition=await userModel.findOne({username:req.user.username}).coverposition
	const coverposition=await userModel.findOne({username:req.user.username})
	res.json({
	coverposition:coverposition.coverposition
	})
})
router.post('/dp', upload.single('displaypicture'), uploadDisplayPicture)
router.post('/cover', upload.fields([{name:'covervideo',maxCount:1},{name:'coverthumbnail',maxCount:1}]),uploadCoverPicture)

export default router
