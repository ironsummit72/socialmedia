import mongoose, {Schema} from 'mongoose'
const tagsSchema = new Schema(
	{
		tagName: {
			type: 'string',
			unique: [true, 'tag already exists'],
			required: true,
		},
		posts: [
			{
				type: Schema.Types.ObjectId,
				ref: 'posts',
			},
		],
	},
	{timestamps: true},
)
const tagsModel = mongoose.model('tags', tagsSchema)
export default tagsModel
