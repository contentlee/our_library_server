import { Router } from "express";
import { addFavoriteBook, deleteFavoriteBook, getFavoriteBooks, getFavoriteIds } from "../controllers/favorite";
import { auth, getUserId } from "../midleware/auth";

const router = Router();

router.get("/favorite/ids", getUserId, getFavoriteIds);
router.get("/favorite/books", auth, getFavoriteBooks);
router.put("/favorite/add/:book_id", auth, addFavoriteBook);
router.delete("/favorite/delete/:book_id", auth, deleteFavoriteBook);

export default router;
