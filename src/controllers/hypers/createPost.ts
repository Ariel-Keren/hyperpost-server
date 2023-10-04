import { Request, Response } from "express";
import Hyper from "../../models/Hyper";

const createPost = async (req: Request, res: Response) => {
  const { hyper } = req.params;
  const { title, text, createdBy } = req.body;

  if (
    typeof title !== "string" ||
    typeof text !== "string" ||
    typeof createdBy !== "string"
  )
    return res.sendStatus(400);

  const now = new Date();
  const newPost = {
    title,
    text,
    createdBy,
    createdAt: now,
    updatedAt: now,
    comments: [],
  };

  await Hyper.updateOne(
    { name: hyper },
    {
      $push: {
        posts: newPost,
      },
    }
  );

  res.sendStatus(201);
};

export default createPost;
