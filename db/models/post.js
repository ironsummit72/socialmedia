const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/socialm')

const postSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
	},
	typeofPost: {
		type: String,
		default: 'normalpost',
	},
	caption: {
		type: String,
	},
	likes: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
	}],
	contents: {
		type: Array,
		default: [],
	},
})
// const Post =
module.exports = mongoose.model('posts', postSchema)
