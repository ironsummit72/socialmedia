const express = require('express')
const router = express.Router()
const multer = require('multer')
const userModel=require('../db/models/user')
const postModel=require('../db/models/post')


router.use(isloggedIn)

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		
		// eslint-disable-next-line no-unused-vars
		const [type, extension] = file.mimetype.split('/')
		if (type === 'image') {
			cb(null, 'uploads/posts/images')
		} else if (type === 'video') {
			cb(null, 'uploads/posts/videos')
		}
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
		const [type, extension] = file.mimetype.split('/')
		cb(null, type + '-' + req.user.username + uniqueSuffix + '.' + extension)
	},
})
router.get('/post', function (req, res) {
	res.render('createpost', { username: req.user.username })
})
const upload = multer({ storage: storage })

// _____________________________ post requests____________________




router.post('/post', upload.array('posts', 6),async function (req, res) {


	const {username}=req.user
	const {caption}=req.body
	if(!req.file)
	{
		let userData = await userModel.findOne({ username })
		let postData = await postModel.create({ user: userData._id,caption,contents:req.files})
		userData.posts.push(postData._id)
		await userData.save()
		// res.send('postcreated successfully')
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

module.exports = router
