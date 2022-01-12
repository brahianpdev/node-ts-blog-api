import mongoose, { Schema } from 'mongoose';

const CommentsSchema: Schema = new Schema(
	{
		comment: {
			type: String,
			required: [true, 'The comment are required'],
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
			required: [true, 'The ID of this User is required'],
		},
	},
	{ timestamps: true },
);

CommentsSchema.methods.toJSON = function () {
	const { __v, state, ...data } = this.toObject();
	return data;
};

export default mongoose.model('Comment', CommentsSchema);
