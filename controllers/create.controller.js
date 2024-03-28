import userModel from '../db/models/user.model.js'
import postModel from '../db/models/post.model.js'
import tagsModel from '../db/models/tags.model.js'
import storyModel from '../db/models/story.model.js'

function renderCreatePostPage(req, res) {
	res.render('createpost', {username: req.user.username})
}
function renderCreateStoryPage(req, res) {
	res.render('createstory', {username: req.user.username})
}

async function uploadPost(req, res) {
	const {username} = req.user
	const {caption} = req.body
	const tags =caption.split(" ").filter(word => /^\#/.test(word)).map(name => name.slice(1));
	const userTags=caption.split(" ").filter(word => /^\@/.test(word)).map(name => name.slice(1));
	if (!req.file) {
		let userData = await userModel.findOne({username})
		let postData = await postModel.create({user: userData._id, caption, contents: req.files})
		userTags.forEach(async(items)=>{
			const userDataTag=await userModel.findOne({username:items.trim()})
			if(userDataTag)
			{
				console.log("yes exists user Tag Data",items);
				userDataTag.taggedposts.push(postData._id)
				await userDataTag.save()
			}
		})
		userData.posts.push(postData._id)
		await userData.save()
		tags.forEach(async (items) => {
			const tagsData = await tagsModel.findOne({tagName: items.trim()})
			if (tagsData === null) {
				const createdData = await tagsModel.create({tagName: items.trim()})
				createdData.posts.push(postData._id)
				await createdData.save()
				console.log('created Data ', createdData)
			} else {
				const tagData = await tagsModel.findOne({tagName: items.trim()})
				tagData.posts.push(postData._id)
				await tagData.save()
				console.log('exists already')
			}
		})
		res.redirect('/')
	}
}

async function uploadStory(req, res) {
	const {username} = req.user
	const userData = await userModel.findOne({username})
	const storyData = await storyModel.create({user: userData._id, caption: req.body.caption, content: req.file})
	res.send(storyData)
}

export {renderCreatePostPage, renderCreateStoryPage, uploadPost, uploadStory}
