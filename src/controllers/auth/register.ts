import { Request, Response } from "express";
import User from "../../models/User";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "dotenv";

config();

const register = async (req: Request, res: Response) => {
  if (!process.env.SECRET_KEY) return res.sendStatus(500);

  const { username, password } = req.body;

  if (typeof username !== "string" || typeof password !== "string")
    return res.status(400).send("The username or password is invalid.");

  const doesUserExist = await User.exists({ username });

  if (doesUserExist)
    return res.status(400).send("This username is already taken.");

  const hashedPassword = await hash(password, 10);

  const user = await User.create({
    username,
    password: hashedPassword,
    hypers: [],
  });

  const token = sign({ id: user._id }, process.env.SECRET_KEY);

  res.status(200).json({ token });
};

export default register;
