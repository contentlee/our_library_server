import db from "../utils/database";
import { Router } from "express";
import { getBooks, getBook, deleteBook, editBook, addBook, searchBooks } from "../controllers/library";

const router = Router();
router.get("/library", getBooks);

router.get("/library/search/:word", searchBooks);

router.get("/library/detail/:id", getBook);

router.post("/add", addBook);

router.delete("/delete/:id", deleteBook);

router.put("/edit/:id", editBook);

export default router;
