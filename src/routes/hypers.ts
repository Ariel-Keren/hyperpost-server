import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import createHyper from "../controllers/hypers/createHyper";
import changeDescription from "../controllers/hypers/changeDescription";
import createPost from "../controllers/hypers/createPost";
import changePost from "../controllers/hypers/changePost";
import createComment from "../controllers/hypers/createComment";
import changeComment from "../controllers/hypers/changeComment";
import getHyper from "../controllers/hypers/getHyper";

const router = Router();

router.use(verifyToken);

router.post("/", createHyper);
router.get("/:hyper", getHyper);
router.patch("/:hyper", changeDescription);
router.post("/:hyper/posts", createPost);
router.patch("/:hyper/posts/:postIndex", changePost);
router.post("/:hyper/posts/:postIndex/comments", createComment);
router.patch("/:hyper/posts/:postIndex/comments/:commentIndex", changeComment);

export default router;
