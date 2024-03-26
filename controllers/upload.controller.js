import userModel from '../db/models/user.model.js'
async function uploadDisplayPicture(req, res) {
	const {path} = req.file
	const {username} = req.user
	let pattern = /uploads/g
	let resultString = path.replace(pattern, '')
	await userModel.updateOne({username}, {$set: {displaypicture: resultString}})
	res.redirect('/')
}
async function uploadCoverPicture(req, res) {
	try {
		const {username} = req.user
		let coverVideo = req.files?.covervideo[0].filename
		let coverThumbnail = req.files?.coverthumbnail[0]?.filename
		console.log('cover video', coverVideo)
		console.log('cover thuumbnail', coverThumbnail)
		const {bio} = req.body
		if (bio === '') {
			await userModel.updateOne({username}, {$set: {covervideo: coverVideo, coverthumbnail: coverThumbnail}})
			res.redirect('/')
		} else {
			await userModel.updateOne({username}, {$set: {covervideo: coverVideo, bio: bio, coverthumbnail: coverThumbnail}})
			res.redirect('/')
		}
	} catch (error) {
		console.log(error)
	}
}
export {uploadDisplayPicture, uploadCoverPicture}
