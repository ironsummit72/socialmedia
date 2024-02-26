import { Router } from "express";
import postModel from "../db/models/post.model.js"
import shuffle from "../utils/shuffle.js";
const router=Router();

router.get('/',isloggedIn, async function(req, res){
    const postData=await postModel.find({}).populate('user');
	let filterPostData=postData.filter((items)=>{
		return items.user?.id!==req.user.id
	})
    shuffle(filterPostData)
	res.render('explore',{postData:filterPostData})
})

function isloggedIn(req, res, next) {
	if (req.user) {
		next()
	} else {
		res.redirect('/login')
	}
}

export default router