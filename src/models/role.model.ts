import mongoose, { Schema } from 'mongoose';

const RoleSchema: Schema = new Schema({
    role: {
        type: String,
        required: [true, 'The role is required']
    }
});

export default mongoose.model('Role', RoleSchema);
