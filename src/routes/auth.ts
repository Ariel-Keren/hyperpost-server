import { Router } from "express";
import register from "../controllers/auth/register";
import login from "../controllers/auth/login";
import session from "../controllers/auth/session";
import verifyToken from "../middleware/verifyToken";

const router = Router();

router.get("/session", session, verifyToken);
router.post("/register", register);
router.post("/login", login);

export default router;
