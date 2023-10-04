import { Request, Response } from "express";
import Hyper from "../../models/Hyper";

const changeDescription = async (req: Request, res: Response) => {
  const { hyper } = req.params;
  const { description } = req.body;

  if (typeof description !== "string") return res.sendStatus(400);

  const now = new Date();
  await Hyper.updateOne(
    { name: hyper },
    { $set: { description, updatedAt: now } }
  );

  res.sendStatus(200);
};

export default changeDescription;
