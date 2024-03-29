import mongoose ,{Schema,model} from "mongoose"
const postSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
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
		type: Schema.Types.ObjectId,
		ref: 'users',
	}],
	contents: {
		type: Array,
		default: [],
	},
},{timestamps:true})
// const Post =
const postModel=model('posts', postSchema)
export default postModel
