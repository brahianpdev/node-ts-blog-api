import mongoose, { Schema } from 'mongoose';

const CategorySchema = new Schema(
	{
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
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true },
);

CategorySchema.methods.toJSON = function () {
	const { __v, state, ...data } = this.toObject();
	return data;
};

export default mongoose.model('Category', CategorySchema);
