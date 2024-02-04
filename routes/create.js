
import express,{Router} from 'express'
import multer,{diskStorage} from 'multer'
import userModel from '../db/models/user.js'
import postModel from '../db/models/post.js'
import tagsModel from '../db/models/tags.js'
const router = Router()
router.use(isloggedIn)

const storage = diskStorage({
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
    const tags=caption.split('#').slice(1)

   
	if(!req.file)
	{
		let userData = await userModel.findOne({ username })
		let postData = await postModel.create({ user: userData._id,caption,contents:req.files})
		userData.posts.push(postData._id)
		await userData.save()
		tags.forEach(async(items)=>{
			const tagsData=await tagsModel.findOne({tagName:items.trim()})
			if(tagsData===null)
			{
				const createdData=await tagsModel.create({tagName:items.trim()})
				createdData.posts.push(postData._id)
				await createdData.save()
				console.log('created Data ',createdData);
			}else{
				const tagData=await tagsModel.findOne({tagName:items.trim()})
				 tagData.posts.push(postData._id)
				 await tagData.save()
				console.log('exists already');
				
			}
		})
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
export default router
