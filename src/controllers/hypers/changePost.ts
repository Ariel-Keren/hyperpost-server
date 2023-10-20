import { Request, Response } from "express";
import Hyper from "../../models/Hyper";

const changePost = async (req: Request, res: Response) => {
  const { hyper, postIndex } = req.params;
  const { title, text, favoritesChange } = req.body;

  if (
    typeof title !== "string" ||
    typeof text !== "string" ||
    typeof favoritesChange !== "number" ||
    ![-1, 0, 1].includes(favoritesChange) ||
    !Number.isInteger(Number(postIndex)) ||
    Number(postIndex) < 0
  )
    return res.sendStatus(400);

  const targetHyper = await Hyper.findOne({ name: hyper });

  if (!targetHyper) return res.sendStatus(404);
  if (Number(postIndex) >= targetHyper.posts.length) return res.sendStatus(400);

  if (
    targetHyper.posts[Number(postIndex)].title !== title ||
    targetHyper.posts[Number(postIndex)].text !== text
  ) {
    const now = new Date();
    targetHyper.posts[Number(postIndex)].updatedAt = now;
  }
  targetHyper.posts[Number(postIndex)].title = title;
  targetHyper.posts[Number(postIndex)].text = text;
  targetHyper.posts[Number(postIndex)].favorites += favoritesChange;
  await targetHyper.save();

  res
    .status(200)
    .json({ updatedAt: targetHyper.posts[Number(postIndex)].updatedAt });
};

export default changePost;
