import express  from "express";
import { getComments } from "../controllers/commentsController";

const router = express.Router();

router.get('/comments/:id', getComments);

export default router;