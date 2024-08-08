import mongoose, { Document, Schema } from 'mongoose';

interface IPost extends Document {
  author: string;
  icon: string;
  date: string;
  content: string;
  upvotes: number;
}

const PostSchema: Schema = new Schema({
  author: { type: String, required: true },
  icon: { type: String, required: true },
  date: { type: String, required: true },
  content: { type: String, required: true },
  upvotes: { type: Number, required: true }
});

const Post = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);

export default Post;
