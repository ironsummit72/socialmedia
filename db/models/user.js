const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/socialm')
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
	displaypicture: {
		type: String,
		default: '',
	},
	coverpicture: {
		type: String,
		default: '',
	},
	followers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'users',
		},
	],
	following: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'users',
		},
	],
	password: {
		type: String,
		required: true,
	},
	bio: {
		type: String,
		default: '',
	},
	posts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'posts',
		},
	],
	likedposts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'posts',
		},
	],
}
// const User =
module.exports = mongoose.model('users', userSchema)
