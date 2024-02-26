import mongoose from 'mongoose'
const storySchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'users',
		},
		caption: String,
		content: {},
		views: [{
			type: mongoose.Schema.Types.ObjectId,
			ref:'users'
		}]
	},
	{timestamps: true},
)
storySchema.index({createdAt: 1}, {expireAfterSeconds: 86400})
const storyModel = mongoose.model('story', storySchema)
export default storyModel
