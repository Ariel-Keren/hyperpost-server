import { Request, Response } from "express";
import Hyper from "../../models/Hyper";
import { Types } from "mongoose";

const createComment = async (req: Request, res: Response) => {
  const { hyperName, postID } = req.params;
  const { text, createdBy } = req.body;

  if (typeof text !== "string" || typeof createdBy !== "string")
    return res.sendStatus(400);

  const hyper = await Hyper.findOne({ name: hyperName });

  if (!hyper) return res.sendStatus(404);

  const postIndex = hyper.posts.findIndex(
    (post) => post._id.toString() === postID
  );

  if (postIndex === -1) return res.sendStatus(404);

  const now = new Date();
  const id = new Types.ObjectId();
  const newComment = {
    text,
    createdBy,
    createdAt: now,
    updatedAt: now,
    _id: id,
  };
  hyper.posts[postIndex].comments.push(newComment);
  await hyper.save();

  res.status(201).json({ id: id.toString(), createdAt: now });
};

export default createComment;
