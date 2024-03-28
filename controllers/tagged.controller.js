import userModel from '../db/models/user.model.js'
async function ownProfileTagged(req,res){
        const {username} = req.user
        const taggedUserData = await userModel.findOne({username}).populate('taggedposts')
        const {
            firstname,
            lastname,
            displaypicture,
            followers,
            following,
            covervideo,
            coverthumbnail,
            coverposition,
            bio,
            posts,
            taggedposts,
        } = taggedUserData
        let ownProfile = false
        if (username === req.user.username) {
            ownProfile = true
        }
        const ownerpicture = await loggedInuserDetails(req.user.username)
        console.log('tagged posts', taggedposts)
        res.render('tagged', {
            username,
            firstname,
            lastname,
            ownprofile: ownProfile,
            displaypicture,
            ownerpicture,
            followers,
            following,
            covervideo,
            coverthumbnail,
            coverposition,
            bio,
            posts,
            taggedposts,
            loggedInUser: req.user.username,
            loggedInUserId: req.user.id,
        })
    
}
async function userProfileTagged(req,res){
    const {username} = req.params
	const taggedUserData = await userModel.findOne({username}).populate('taggedposts')
	const {
		firstname,
		lastname,
		displaypicture,
		followers,
		following,
		covervideo,
		coverthumbnail,
		coverposition,
		bio,
		posts,
		taggedposts,
	} = taggedUserData
	let ownProfile = false
	if (username === req.user.username) {
		ownProfile = true
	}
	const ownerpicture = await loggedInuserDetails(req.user.username)
	console.log('tagged posts', taggedposts)
	res.render('tagged', {
		username,
		firstname,
		lastname,
		ownprofile: ownProfile,
		displaypicture,
		ownerpicture,
		followers,
		following,
		covervideo,
		coverthumbnail,
		coverposition,
		bio,
		posts,
		taggedposts,
		loggedInUser: req.user.username,
		loggedInUserId: req.user.id,
	})

}
async function loggedInuserDetails(username) {
	let userData = await userModel.findOne({username})
	const {displaypicture} = userData
	return displaypicture
}
export {userProfileTagged,ownProfileTagged}