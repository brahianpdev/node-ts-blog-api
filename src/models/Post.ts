import mongoose, { Schema } from 'mongoose';

const PostSchema: Schema = new Schema(
    {
      title: {
        type: String,
        required: true,
        unique: true,
      },
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
    { timestamps: true }
  );
  
export default mongoose.model('Post', PostSchema);