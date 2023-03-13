import { Router } from "express";
import {
  addComment,
  deleteComment,
  editComment,
  getCommentsByBookId,
  getCommentsByUserId,
} from "../controllers/comment";
import { auth, getUserId } from "../midleware/auth";

const router = Router();

router.get("/comment/book/:book_id", getUserId, getCommentsByBookId);
router.get("/comment/user", getCommentsByUserId);
router.post("/comment/add", auth, addComment);
router.put("/comment/edit/:comment_id", auth, editComment);
router.delete("/comment/delete/:comment_id", auth, deleteComment);

export default router;
