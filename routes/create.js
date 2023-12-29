const express = require('express')
const router = express.Router()
const multer = require('multer')

router.use(isloggedIn)

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const [type, extension] = file.mimetype.split('/')
		console.log(`the type is ${type} and the extension is ${extension}`)
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

router.post('/post', upload.array('posts', 6), function (req, res) {
	console.log(req.files)
	console.log(req.body.caption)
	res.send('postcreated successfully')
})

function isloggedIn(req, res, next) {
	if (req.user) {
		next()
	} else {
		res.redirect('/login')
	}
}

module.exports = router
