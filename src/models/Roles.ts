import mongoose, { Schema } from 'mongoose';

const RoleSchema: Schema = new Schema({
	role: {
		type: String,
		required: true,
	},
});

export default mongoose.model('Role', RoleSchema);
