import mongoose, { Schema } from 'mongoose';

const CommentsSchema: Schema = new Schema(
	{
		description: {
			type: String,
			required: true,
		},
		photo: {
			type: String,
			required: false,
		},
		username: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

export default mongoose.model('Comments', CommentsSchema);
