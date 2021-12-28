import mongoose, { Schema } from 'mongoose';

const CommentsSchema: Schema = new Schema(
	{
		description: {
			type: String,
			required: [true, 'The description are required'],
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
			required: true,
		},
	},
	{ timestamps: true },
);

CommentsSchema.methods.toJSON = function () {
	const { __v, state, ...data } = this.toObject();
	return data;
};

export default mongoose.model('Comment', CommentsSchema);
