import {Router} from 'express'
import userModel from '../db/models/user.js'
import storyModel from '../db/models/story.js'
const router = Router()
router.get('/', async function (req, res) {
	const {username} = req.user || {}
	const userData = await userModel.findOne({username})
	const {_id} = userData || {}
	const storyData = await storyModel.find({user: _id})
	if (storyData.length > 0) {
		res.render('stories', {storyData})
	} else {
		res.redirect('../')
	}
})
router.get('/:username', async function (req, res) {
	const {username} = req.params
	const userData = await userModel.findOne({username})
	const {_id} = userData || {}
	const storyData = await storyModel.find({user: _id})
	if (storyData.length > 0) {
		res.render('stories', {storyData})
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
