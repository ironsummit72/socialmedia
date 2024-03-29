import {Schema, model} from 'mongoose'

import connectDB from '../../utils/connectDB.js'

connectDB()

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
		covervideo: {
			type: String,
			default: '',
		},
		coverthumbnail: {
			type: String,
			default: '',
		},
		coverposition: {
			type: String,
			default: 'center',
			enum: ['top', 'center', 'bottom'],
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
		taggedposts: [{type: Schema.Types.ObjectId, ref: 'posts'}],
	},
	{timestamps: true},
)
const userModel = model('users', userSchema)
// const User =
export default userModel
