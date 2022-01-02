import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
	title: {
		type: String,
		required: [true, 'The title is required'],
		unique: true,
	},
	state: {
		type: Boolean,
		default: true,
		required: true,
	},
	nickname: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		// required: true,
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
		required: false,
	},
	description: {
		type: String,
		required: [true, 'The description is required'],
	},
	img: { type: String },
});

PostSchema.methods.toJSON = function () {
	const { __v, state, ...data } = this.toObject();
	return data;
};

export default mongoose.model('Post', PostSchema);
