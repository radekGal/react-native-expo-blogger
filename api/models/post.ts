import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
  _id: String,
  createAt: {
    type: Date,
    default: Date.now
  },
  title: String,
  desc: String,
  authorEmail: String,
  imageUrl: String,
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

postSchema.virtual('author', {
  ref: 'User',
  localField: 'authorEmail',
  foreignField: 'email',
  justOne: true 
});

postSchema.virtual('comments', {
  ref: 'Comment',
  localField: "_id",
  foreignField: 'postId',
  justOne: true 
});

const Post = mongoose.model('Post', postSchema, 'Post');

export default Post;
