import { Request, Response } from "express";
import User from "../../models/User";

const getUser = async (req: Request, res: Response) => {
  const { username } = req.params;

  const user = await User.findOne({ username });

  if (!user) return res.sendStatus(404);

  res.status(200).json({ hypers: user.hypers });
};

export default getUser;
