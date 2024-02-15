import {Router} from 'express'
import userModel from '../db/models/user.js'
import storyModel from '../db/models/story.js'
const router = Router()
router.get('/', async function (req, res) {
	const {username} = req.user || {}
	const userData = await userModel.findOne({username})
	const {_id} = userData || {}
	let ownProfile=false;
	const storyData = await storyModel.find({user: _id}).populate('user')
	if (storyData.length > 0) {
		if(req.user.id===userData.id)
		{
			ownProfile=true;
		}else{
			ownProfile=false
			
		}
		res.render('stories', {storyData,ownProfile})
	} else {
		res.redirect('../')
	}
})
router.get('/:username', async function (req, res) {
	const {username} = req.params
	const userData = await userModel.findOne({username})
	const {_id} = userData || {}
	let ownProfile=false;
	const storyData = await storyModel.find({user: _id}).populate('user')
	if (storyData.length > 0) {
		//! insert the user view count if not exists already 
		if(req.user.id===userData.id)
		{
			ownProfile=true;
		}else{
			ownProfile=false
			
		}
		console.log(req.user,ownProfile);
		console.log(storyData[0].views);
		res.render('stories', {storyData,ownProfile})
	} else {
		res.redirect(`../profile/${username}`)
	}
});
router.get('/api/available/:username', async function (req, res) {
	const {username} = req.params
	const userData = await userModel.findOne({username})
	const {_id} = userData || {}
	const storyData = await storyModel.find({user: _id})
	res.json(storyData)
});
export default router
