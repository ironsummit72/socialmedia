let express = require('express');
let router = express.Router();
const {generateHash} =require('../utils/hashgen')
const userModel=require('../db/models/user');
const passport = require('passport');

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});


/* GET ROUTES ----------------------------------------------. */
router.get('/login', function(req, res,){
  res.render('login');
})
 
router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register',async function(req, res){
const {username,password,cpassword,firstname,lastname,email} = req.body
if(password===cpassword)
{
  const {hash,salt}=generateHash(password);
  let userdata=await userModel.create({username,password:`${hash}.${salt}`,firstname,lastname,email})
  res.send('successfully registered');
}
})
router.post('/login',passport.authenticate('local',{successRedirect:'/',failureRedirect:'/login'}))




module.exports = router;
