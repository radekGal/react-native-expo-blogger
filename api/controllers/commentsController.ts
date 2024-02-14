import { Request, Response } from "express";
import Comment from "../models/comment";
import User from "../models/user";

export const getComments = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const comments = await Comment.find({ postId: id })
      .populate({ path: 'author', model: User, select: 'name image' });
    res.status(200).json(comments)
  } catch(err) {
    res.status(500).json({ message: `${err}`})
  }
}