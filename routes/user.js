import { Router } from "express";
import { changeUserName, changeUserPwd, getName, signIn, signUp } from "../controllers/user";
import { auth } from "../midleware/auth";

const router = Router();

router.get("/me", auth, getName);
router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/change/username", auth, changeUserName);
router.post("/change/userpwd", auth, changeUserPwd);

export default router;
