import userModel from '../db/models/user.model.js'
async function uploadDisplayPicture(req, res) {
	const { path } = req.file
	const { username } = req.user
	let pattern = /uploads/g
	let resultString = path.replace(pattern, '')
	await userModel.updateOne(
		{ username },
		{ $set: { displaypicture: resultString } }
	)
	res.redirect('/')
}
async function uploadCoverPicture(req, res) {
	const {path} = req.file
	const {username} = req.user
	let pattern = /uploads/g
	let resultString = path.replace(pattern, '')
	const {bio} = req.body
	if (bio === '') {
		await userModel.updateOne({username}, {$set: {coverpicture: resultString}})
        res.redirect('/')
	} else {
        await userModel.updateOne({username}, {$set: {coverpicture: resultString, bio: bio}})
		res.redirect('/')
	}
}
export {uploadDisplayPicture,uploadCoverPicture}