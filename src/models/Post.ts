import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
	name: {
		type: String,
		required: [true, 'The name is required'],
		unique: true,
	},
	state: {
		type: Boolean,
		default: true,
		required: true,
	},
	nickname: {
		type: Schema.Types.ObjectId,
		ref: 'Usuario',
		required: true,
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
		required: true,
	},
	description: { type: String },
	img: { type: String },
});

PostSchema.methods.toJSON = function () {
	const { __v, state, ...data } = this.toObject();
	return data;
};

export default mongoose.model('Post', PostSchema);
