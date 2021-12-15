import mongoose, { Schema } from 'mongoose';

// const UserSchema: Schema = new mongoose.Schema({
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
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);