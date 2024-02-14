import { Request, Response } from "express";
import Post from "../models/post";
import User from "../models/user";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find()
      .sort({ createAt: -1 })
      .populate({path: 'author', model: User, select: 'name image' })
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
};

export const getSinglePost = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id).populate({ path: 'author', model: User });
    if (!post) res.status(500).json({ message: 'Something goes wrong...' });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
};