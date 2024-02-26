import userModel from '../db/models/user.model.js'
import storyModel from '../db/models/story.model.js'

async function renderStoriesOfLoggedInUser(req, res) {
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
}

async function renderStoriesOfUsers(req, res) {
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
}

async function isStoryAvailable(req, res) {
	const {username} = req.params
	const userData = await userModel.findOne({username})
	const {_id} = userData || {}
	const storyData = await storyModel.find({user: _id})
	res.json(storyData)
}



export {renderStoriesOfLoggedInUser,renderStoriesOfUsers,isStoryAvailable}