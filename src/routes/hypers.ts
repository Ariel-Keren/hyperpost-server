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
router.get("/:hyperName", getHyper);
router.patch("/:hyperName", changeDescription);
router.post("/:hyperName/posts", createPost);
router.patch("/:hyperName/posts/:postID", changePost);
router.post("/:hyperName/posts/:postID/comments", createComment);
router.patch("/:hyperName/posts/:postID/comments/:commentID", changeComment);

export default router;
