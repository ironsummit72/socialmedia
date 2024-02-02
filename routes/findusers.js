import  { Router } from "express";
const router=Router();
import userModel from "../db/models/user.js";
import shuffle from "../utils/shuffle.js";

router.get('/',isloggedIn,async (req,res)=>{
    const users=await userModel.find()
	shuffle(users);
res.render('findusers',{users})
})

function isloggedIn(req, res, next) {
	if (req.user) {
		next()
	} else {
		res.redirect('/login')
	}
}

export default router