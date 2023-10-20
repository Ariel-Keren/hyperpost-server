import { Request, Response } from "express";
import Hyper from "../../models/Hyper";
import { Types } from "mongoose";

const createPost = async (req: Request, res: Response) => {
  const { hyperName } = req.params;
  const { title, text, createdBy } = req.body;

  if (
    typeof title !== "string" ||
    typeof text !== "string" ||
    typeof createdBy !== "string"
  )
    return res.sendStatus(400);

  const now = new Date();
  const id = new Types.ObjectId();
  const newPost = {
    title,
    text,
    createdBy,
    favorites: 0,
    createdAt: now,
    updatedAt: now,
    comments: [],
    _id: id,
  };

  await Hyper.updateOne(
    { name: hyperName },
    {
      $push: {
        posts: newPost,
      },
    }
  );

  res.status(201).json({ id: id.toString(), createdAt: now });
};

export default createPost;
