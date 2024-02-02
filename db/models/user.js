import mongoose ,{Schema,model} from "mongoose"
mongoose.connect('mongodb://localhost:27017/socialm')
const userSchema = new Schema(
	{
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
				type: Schema.Types.ObjectId,
				ref: 'users',
			},
		],
		following: [
			{
				type: Schema.Types.ObjectId,
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
				type: Schema.Types.ObjectId,
				ref: 'posts',
			},
		],
		likedposts: [
			{
				type: Schema.Types.ObjectId,
				ref: 'posts',
			},
		],
	},{timestamps:true}
)
const userModel=model('users', userSchema)
// const User =
export default userModel
