import {Router} from 'express'
import tagsModel from '../db/models/tags.model.js'
const router = Router()
router.get('/:tagName', async function (req, res) {
	const {tagName} = req.params
	const tagData = await tagsModel.findOne({tagName}).populate('posts')
    if(tagData!==null)
    {
        const {posts} = tagData
        res.render('hashtag', {posts, tagName})
    }else{
        res.render('nohashtag',{tagName})
    }
})
export default router
