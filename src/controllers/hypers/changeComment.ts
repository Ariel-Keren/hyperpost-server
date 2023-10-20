import { Request, Response } from "express";
import Hyper from "../../models/Hyper";

const changeComment = async (req: Request, res: Response) => {
  const { hyperName, postID, commentID } = req.params;
  const { text } = req.body;

  if (typeof text !== "string") return res.sendStatus(400);

  const hyper = await Hyper.findOne({ name: hyperName });

  if (!hyper) return res.sendStatus(404);

  const postIndex = hyper.posts.findIndex(
    (post) => post._id.toString() === postID
  );

  if (postIndex === -1) return res.sendStatus(404);

  const commentIndex = hyper.posts[postIndex].comments.findIndex(
    (comment) => comment._id.toString() === commentID
  );

  if (commentIndex === -1) return res.sendStatus(404);

  const now = new Date();
  hyper.posts[postIndex].comments[commentIndex].text = text;
  hyper.posts[postIndex].comments[commentIndex].updatedAt = now;
  await hyper.save();

  res.sendStatus(200);
};

export default changeComment;
