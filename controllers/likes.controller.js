import userModel from '../db/models/user.model.js'
import postModel from '../db/models/post.model.js'
import shuffle from '../utils/shuffle.js'


async function showLikedBy(req, res) {
	const {postId} = req.params
	if (postId !== null) {
		let postData = await postModel.findOne({_id: postId}).populate('likes')
		if(postData!==null){
			const {likes} = postData
			shuffle(likes)
			res.render('likes', {likes})
		}else{
			res.render('someerror', {message:'no post found '})
		}
	}
}

async function addLike(req, res) {
	const {postIdUser} = req.params
	const {username} = req.user
	const [postId, user] = postIdUser.split('+')
	let userData = await userModel.findOne({username})
	let postData = await postModel.findOne({_id: postId})
	if (!userData.likedposts.includes(postData._id) && !postData.likes.includes(userData._id)) {
		userData.likedposts.push(postId)
		await userData.save()
		postData.likes.push(userData._id)
		await postData.save()
		res.json({isLiked:true})
	} else {
		let userData = await userModel.findOne({username})
		let postData = await postModel.findOne({_id: postId})

		let newUserData=userData.likedposts.filter((likedpost)=>{
			return likedpost.toString() !== postData._id.toString()
		})
		let newPostData = postData.likes.filter((likes)=>{
			return likes.toString()!==userData._id.toString()
		})
		userData.likedposts=[...newUserData]
		await userData.save()
		postData.likes=[...newPostData]
		await postData.save()
		res.json({isLiked:false})
	}
}
async function renderLikedPostsOfLoggedInUser(req, res) {
	const {id, username} = req.user
	const likedpostsData = await userModel.findOne({_id: id}).populate('likedposts')
	const {likedposts} = likedpostsData
	res.render('likedposts', {likedposts, username})
}
export {showLikedBy,addLike,renderLikedPostsOfLoggedInUser}