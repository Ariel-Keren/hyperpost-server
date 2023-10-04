import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import User from "../../models/User";

const session = async (req: Request, res: Response) => {
  const token = req.headers.authorization;

  if (!token) return res.sendStatus(401);

  const decodedToken = decode(token);

  if (!decodedToken || typeof decodedToken === "string")
    return res.sendStatus(403);

  const user = await User.findById(decodedToken.id);

  if (!user) return res.sendStatus(404);

  res.status(200).json({ username: user.username, hypers: user.hypers });
};

export default session;
