import { Router } from "express";
import { addFavoriteBook, deleteFavoriteBook, getFavoriteBooks, getFavoriteIds } from "../controllers/favorite";
import { auth } from "../midleware/auth";

const router = Router();

router.get("/favorite/ids/:user_id", auth, getFavoriteIds);
router.get("/favorite/books/:user_id", auth, getFavoriteBooks);
router.post("/favorite/add", auth, addFavoriteBook);
router.delete("/favorite/delete/:book_id", auth, deleteFavoriteBook);

export default router;
