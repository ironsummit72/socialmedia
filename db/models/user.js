const mongoose = require('mongoose');
const connection=mongoose.createConnection('mongodb://localhost:27017/socialm');
const userSchema = {
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  displayPicture: {
    type: String,
    default:''
  },
  bio: {
    type: String,
    default: "",
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
    },
  ],
};
const User=connection.model('Users',userSchema);
module.exports=User;
