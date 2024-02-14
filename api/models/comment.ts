import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
  _id: String,
  createAt: {
    type: Date,
    default: Date.now
  },
  comment: String,
  postId: String,
  userEmail: String
},
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

commentSchema.virtual('author', {
  ref: 'User',
  localField: 'userEmail',
  foreignField: 'email',
  justOne: true 
})

const Comment = mongoose.model('Comment', commentSchema, 'Comment');

export default Comment;
