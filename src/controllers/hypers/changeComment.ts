import { Request, Response } from "express";
import Hyper from "../../models/Hyper";

const changeComment = async (req: Request, res: Response) => {
  const { hyper, postIndex, commentIndex } = req.params;
  const { text } = req.body;

  if (
    typeof text !== "string" ||
    !Number.isInteger(Number(postIndex)) ||
    Number(postIndex) < 0 ||
    !Number.isInteger(Number(commentIndex)) ||
    Number(commentIndex) < 0
  )
    return res.sendStatus(400);

  const targetHyper = await Hyper.findOne({ name: hyper });

  if (!targetHyper) return res.sendStatus(404);
  if (Number(postIndex) >= targetHyper.posts.length) return res.sendStatus(400);

  const now = new Date();
  targetHyper.posts[Number(postIndex)].comments[Number(commentIndex)].text =
    text;
  targetHyper.posts[Number(postIndex)].comments[
    Number(commentIndex)
  ].updatedAt = now;
  await targetHyper.save();

  res.sendStatus(200);
};

export default changeComment;
