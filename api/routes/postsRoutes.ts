import express from 'express';
import { getPosts, getSinglePost } from '../controllers/postsController';

const router = express.Router();

router.get('/posts', getPosts);
router.get('/posts/:id', getSinglePost);

export default router;
