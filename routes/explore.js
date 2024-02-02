import { Router } from "express";
import postModel from "../db/models/post.js"
const router=Router();


router.get('/',isloggedIn, async function(req, res){
    const postData=await postModel.find({}).populate('user');
	
	console.log(postData);
	res.render('explore',{postData})
})

function isloggedIn(req, res, next) {
	if (req.user) {
		next()
	} else {
		res.redirect('/login')
	}
}

export default router