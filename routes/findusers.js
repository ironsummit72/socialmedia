import  { Router } from "express";
const router=Router();
import userModel from "../db/models/user.js";

router.get('/',isloggedIn,async (req,res)=>{
    const users=await userModel.find()
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