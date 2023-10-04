import { Request, Response } from "express";
import User from "../../models/User";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "dotenv";

config();

const login = async (req: Request, res: Response) => {
  if (!process.env.SECRET_KEY) return res.sendStatus(500);

  const { username, password } = req.body;

  if (typeof username !== "string" || typeof password !== "string")
    return res.status(400).send("The username or password is invalid.");

  const user = await User.findOne({ username });

  if (!user) return res.status(400).send("The username is incorrect.");

  const doesPasswordMatch = await compare(password, user.password);

  if (!doesPasswordMatch)
    return res.status(400).send("The username or password is incorrect.");

  const token = sign({ id: user._id }, process.env.SECRET_KEY);

  res.status(200).json({ token, hypers: user.hypers });
};

export default login;
