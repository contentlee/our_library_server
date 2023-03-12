import { Router } from "express";
import { getBooks, getBook, deleteBook, editBook, addBook, searchBooks } from "../controllers/library";
import { auth } from "../midleware/auth";

const router = Router();
router.get("/library", getBooks);
router.get("/library/search/:word", searchBooks);
router.get("/library/detail/:id", getBook);
router.get("/library/edit/:id", auth, getBook);
router.post("/library/add", auth, addBook);
router.put("/library/edit/:id", auth, editBook);
router.delete("/library/delete/:id", auth, deleteBook);

export default router;
