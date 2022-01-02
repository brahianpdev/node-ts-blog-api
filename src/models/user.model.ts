import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
	nickname: {
		type: String,
		required: [true, 'The nickname is required'],
	},
	email: {
		type: String,
		required: [true, 'The email is required'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'The password is required'],
	},
	img: {
		type: String,
	},
	role: {
		type: String,
		required: true,
		default: 'USER_ROLE',
		emun: ['ADMIN_ROLE', 'USER_ROLE'],
	},
	state: {
		type: Boolean,
		default: true,
	},
});

UserSchema.methods.toJSON = function () {
	const { __v, password, _id, ...user } = this.toObject();
	user.uid = _id;
	return user;
};

export default mongoose.model('User', UserSchema);
