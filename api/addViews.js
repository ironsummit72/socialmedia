import {Router} from 'express'
import storyModel from '../db/models/story.js';
import userModel from '../db/models/user.js';
import mongoose from 'mongoose';

// /addview/stories/storyId
const router=Router();
router.post('/stories/:storyId',async function(req, res) {
 const userData=await userModel.findOne({_id:new mongoose.Types.ObjectId(req.user.id)})
const {storyId} = req.params
const storyData=await storyModel.findOne({_id:new mongoose.Types.ObjectId(storyId)})
if(storyData.user==req.user.id)
{

}else{
    if(!storyData.views.includes(userData._id))
    {
        storyData.views.push(userData._id)
        await storyData.save()
        res.status(200).json({success:true})
    }else{
        res.status(200).json({viewed:true}) 
    }
}
}
    // update views


)
export default router