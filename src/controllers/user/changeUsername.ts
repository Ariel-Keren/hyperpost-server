import { Request, Response } from "express";
import User from "../../models/User";

const changeUsername = async (req: Request, res: Response) => {
  const { username } = req.params;
  const { newUsername } = req.body;

  if (typeof newUsername !== "string")
    return res.status(400).send("Invalid request");

  const isUsernameTaken = await User.exists({ username: newUsername });

  if (isUsernameTaken)
    return res.status(400).send("This username is already taken.");

  await User.updateOne({ username }, { $set: { username: newUsername } });

  res.sendStatus(200);
};

export default changeUsername;
