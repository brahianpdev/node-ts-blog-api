import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
  username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    token: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);