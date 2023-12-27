let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/profile',isloggedIn, function(req, res, next) {
  res.render('profile', { username:req.user.username});
});

function isloggedIn(req,res,next) {
  if(req.user) {
    next();
  }else{
    res.redirect('/login')
  }
  
}


module.exports = router;
