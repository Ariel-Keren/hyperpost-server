import { Request, Response } from "express";
import Hyper from "../../models/Hyper";
import User from "../../models/User";

const createHyper = async (req: Request, res: Response) => {
  const { name, description, createdBy } = req.body;

  if (
    typeof name !== "string" ||
    typeof description !== "string" ||
    typeof createdBy !== "string"
  )
    return res.sendStatus(400);

  const now = new Date();
  await Hyper.create({
    name,
    description,
    createdBy,
    createdAt: now,
    updatedAt: now,
    posts: [],
  });
  await User.updateOne(
    { username: createdBy },
    { $push: { hypers: { name, createdBy, createdAt: now } } }
  );

  res.status(201).json({ createdAt: now });
};

export default createHyper;
