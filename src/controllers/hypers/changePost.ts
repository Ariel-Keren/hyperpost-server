import { Request, Response } from "express";
import Hyper from "../../models/Hyper";

const changePost = async (req: Request, res: Response) => {
  const { hyperName, postID } = req.params;
  const { title, text, favoritesChange } = req.body;

  if (
    typeof title !== "string" ||
    typeof text !== "string" ||
    typeof favoritesChange !== "number" ||
    ![-1, 0, 1].includes(favoritesChange)
  )
    return res.sendStatus(400);

  const hyper = await Hyper.findOne({ name: hyperName });

  if (!hyper) return res.sendStatus(404);

  const postIndex = hyper.posts.findIndex(
    (post) => post._id.toString() === postID
  );

  if (postIndex === -1) return res.sendStatus(404);

  if (
    hyper.posts[postIndex].title !== title ||
    hyper.posts[postIndex].text !== text
  ) {
    const now = new Date();
    hyper.posts[postIndex].updatedAt = now;
  }
  hyper.posts[postIndex].title = title;
  hyper.posts[postIndex].text = text;
  hyper.posts[postIndex].favorites += favoritesChange;
  await hyper.save();

  res.status(200).json({ updatedAt: hyper.posts[postIndex].updatedAt });
};

export default changePost;
