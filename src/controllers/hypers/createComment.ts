import { Request, Response } from "express";
import Hyper from "../../models/Hyper";

const createComment = async (req: Request, res: Response) => {
  const { hyper, postIndex } = req.params;
  const { text, createdBy } = req.body;

  if (
    typeof text !== "string" ||
    typeof createdBy !== "string" ||
    !Number.isInteger(Number(postIndex)) ||
    Number(postIndex) < 0
  )
    return res.sendStatus(400);

  const targetHyper = await Hyper.findOne({ name: hyper });

  if (!targetHyper) return res.sendStatus(404);
  if (Number(postIndex) >= targetHyper.posts.length) return res.sendStatus(400);

  const now = new Date();
  const newComment = { text, createdBy, createdAt: now, updatedAt: now };
  targetHyper.posts[Number(postIndex)].comments.push(newComment);
  await targetHyper.save();

  res.status(201).json({createdAt: now})
};

export default createComment;
