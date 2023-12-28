let express = require('express');
let router = express.Router();
const userModel=require('../db/models/user')

/* GET home page. */

router.get('/',isloggedIn,async function(req, res, next) {
  const {username}=req.user
  const userData=await userModel.findOne({username});
  if(userData!==null)
  {
    const {firstname,lastname,displaypicture}=userData
    let ownProfile=false;
    if(username===req.user.username){
      ownProfile=true
  }
    res.render('profile',{username,firstname,lastname,ownprofile:ownProfile,displaypicture})
  }else{
    res.render('nouser',{error:"user does not exist"})
  }
 
});
router.get('/profile/:username',isloggedIn,async function(req, res, next) {
  const {username}=req.params
  let userData=await userModel.findOne({username});
  if(userData!==null){
    const {firstname,lastname,displaypicture}=userData
    let ownProfile=false;
    if(username===req.user.username){
        ownProfile=true
    }
    res.render('profile', { username,firstname,lastname,ownprofile:ownProfile,displaypicture})
  }else{
    res.render('nouser',{error:"user does not exist"})
  }

})

function isloggedIn(req,res,next) {
  if(req.user) {
    next();
  }else{
    res.redirect('/login')
  }
  
}


module.exports = router;
