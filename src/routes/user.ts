import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import getUser from "../controllers/user/getUser";
import joinHyper from "../controllers/user/joinHyper";
import changeUsername from "../controllers/user/changeUsername";
import changePassword from "../controllers/user/changePassword";

const router = Router({ mergeParams: true });

router.use(verifyToken);

router.get("/", getUser);
router.patch("/", joinHyper);
router.patch("/username", changeUsername);
router.patch("/password", changePassword);

export default router;
