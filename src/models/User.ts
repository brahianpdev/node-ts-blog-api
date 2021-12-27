import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new Schema(
	{
		username: {
			type: String,
			required: [true, 'Username is required'],
			unique: true,
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
		},
		profilePicture: {
			type: String,
		},
		role: {
			type: String,
			required: true,
			default: 'USER_ROLE',
			enum: ['ADMIN_ROLE', 'USER_ROLE'],
		},
		state: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true },
);

UserSchema.methods.toJSON = function () {
	const { __v, password, _id, ...user } = this.toObject();
	user.uid = _id;
	return user;
};

export default mongoose.model('User', UserSchema);
