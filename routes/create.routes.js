
import {Router} from 'express'
import userModel from '../db/models/user.model.js'
import postModel from '../db/models/post.model.js'
import tagsModel from '../db/models/tags.model.js'
import storyModel from '../db/models/story.model.js'
import upload from '../middleware/multer.js'
const router = Router()
router.use(isloggedIn)

router.get('/post', function (req, res) {
	res.render('createpost', { username: req.user.username })
})
router.get('/story', function (req, res) {
	res.render('createstory', { username: req.user.username })
})
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
		res.redirect('/')
	}
})

router.post('/story',upload.single('stories'),async function(req, res){
const {username}=req.user
const  userData = await userModel.findOne({ username })
const storyData=await storyModel.create({user:userData._id,caption:req.body.caption,content:req.file})
res.send(storyData)
});
function isloggedIn(req, res, next) {
	if (req.user) {
		next()
	} else {
		res.redirect('/login')
	}
}
export default router
