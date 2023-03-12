import { Router } from "express";
import { changeUserName, changeUserPwd, signIn, signUp } from "../controllers/user";
import { auth } from "../midleware/auth";

const router = Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/change/username", auth, changeUserName);
router.post("/change/userpwd", auth, changeUserPwd);

export default router;
