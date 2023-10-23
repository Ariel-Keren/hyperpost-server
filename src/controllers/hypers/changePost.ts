import { Request, Response } from "express";
import Hyper from "../../models/Hyper";
import User from "../../models/User";

const changePost = async (req: Request, res: Response) => {
  const { hyperName, postID } = req.params;
  const { title, text, favoritesChange, username } = req.body;

  if (
    typeof title !== "string" ||
    typeof text !== "string" ||
    typeof favoritesChange !== "number" ||
    typeof username !== "string" ||
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
    hyper.posts[postIndex].title = title;
    hyper.posts[postIndex].text = text;
    hyper.posts[postIndex].updatedAt = now;
  } else if (favoritesChange) {
    const user = await User.findOne({ username });

    if (!user) return res.sendStatus(404);

    const hyperIndex = user.hypers.findIndex(
      (currentHyper) => currentHyper.name === hyperName
    );

    if (hyperIndex === -1) return res.sendStatus(404);

    const favoriteIndex = user.hypers[hyperIndex].favorites.findIndex(
      (favorite) =>
        favorite.toString() === hyper.posts[postIndex]._id.toString()
    );

    if (favoritesChange === 1) {
      if (favoriteIndex !== -1) return res.sendStatus(400);
      user.hypers[hyperIndex].favorites.push(hyper.posts[postIndex]._id);
    } else {
      if (favoriteIndex === -1) return res.sendStatus(404);
      user.hypers[hyperIndex].favorites.splice(favoriteIndex, 1);
    }

    await user.save();
    hyper.posts[postIndex].favorites += favoritesChange;
  }

  await hyper.save();

  res.status(200).json({ updatedAt: hyper.posts[postIndex].updatedAt });
};

export default changePost;
