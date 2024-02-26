import postModel from '../db/models/post.model.js'
import shuffle from '../utils/shuffle.js'
async function explorePosts(req, res) {
	const postData = await postModel.find({}).populate('user')
	let filterPostData = postData.filter((items) => {
		return items.user?.id !== req.user.id
	})
	shuffle(filterPostData)
	res.render('explore', {postData: filterPostData})
}
export {explorePosts}
