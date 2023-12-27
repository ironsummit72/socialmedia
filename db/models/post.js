const mongoose=require('mongoose');
const connection=mongoose.createConnection('mongodb://localhost:27017/socialm');

const postSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    },
    typeofPost:{
        type:String,
        default:'type'
    },
    caption:{
        type:String,
    },
    likes:{
        type:Array,
        default:[]
    },
    contents:[{
        type:String,
    }]
});
const Post=mongoose.model('Posts',postSchema);
module.exports=Post;