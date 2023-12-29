const express=require('express');
const router=express.Router();
const userModel=require('../db/models/user')
const multer  = require('multer')
const fs=require('fs');
router.use(isloggedIn);

const dir = './uploads';
// create new directory
try {
    // check if directory already exists
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        console.log(" uploads Directory is created.");
        
    } else {
        console.log("Directory already exists.");
        if(!fs.existsSync('./uploads/displaypicture')){
            fs.mkdirSync('./uploads/displaypicture');
            fs.mkdirSync('./uploads/coverpicture');
        }
       
    }
} catch (err) {
    console.log(err);
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/displaypicture')
    },
    filename: function (req, file, cb) {
        console.log('file name',req.user);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const [filename,extension]=file.originalname.split('.');
      const {username}=req.user;
      cb(null, file.fieldname + '-' +username+'.'+extension); 
    }
  })
const coverStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/coverpicture')
    },
    filename: function (req, file, cb) {
        console.log('file name',req.user);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const [filename,extension]=file.originalname.split('.');
      const {username}=req.user;
      cb(null, file.fieldname + '-' +username+'.'+extension); 
    }
  })
  
  const upload = multer({ storage: storage })
  const coverUpload = multer({ storage: coverStorage })

router.get('/dp', function(req, res){
    res.render('uploadprofile')
});
router.get('/cover', function(req, res){
    res.render('uploadcover')
});

router.post('/dp',upload.single('avatar'),async function(req, res){
const {path}=req.file;
const {username}=req.user

let pattern = /uploads/g;
let resultString = path.replace(pattern, '');
console.log(resultString);
let userData=await userModel.updateOne({username},{$set:{displaypicture:resultString}})
res.send(userData)
})


router.post('/cover',coverUpload.single('cover'),async function(req, res){
const {path}=req.file;
const {username}=req.user
let pattern = /uploads/g;
let resultString = path.replace(pattern, '');
console.log(resultString);
const {bio}=req.body
if(bio===undefined)
{

  let userData=await userModel.updateOne({username},{$set:{coverpicture:resultString}})
  res.send(userData)
}else{
  let userData=await userModel.updateOne({username},{$set:{coverpicture:resultString,bio:bio}})
  res.send(userData)

}
})
function isloggedIn(req,res,next) {
    if(req.user) {
      next();
    }else{
      res.redirect('/login')
    }
    
  }
  

module.exports=router;