import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  _id: String,
  name: String,
  email: {
    type: String,
    unique: true,
  },
  image: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
},
  {
    timestamps: true,
    toJSON: { virtuals: true },
  });


userSchema.virtual('posts', {
  ref: 'Post',
  localField: 'email',
  foreignField: 'authorEmail',
});

const User = mongoose.model('User', userSchema, 'User');

export default User;

