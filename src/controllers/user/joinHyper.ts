import { Request, Response } from "express";
import Hyper from "../../models/Hyper";
import User from "../../models/User";

const joinHyper = async (req: Request, res: Response) => {
  const { username } = req.params;
  const { hyper } = req.body;

  if (typeof hyper !== "string") return res.sendStatus(400);

  const targetHyper = await Hyper.findOne({ name: hyper });

  if (!targetHyper) return res.sendStatus(404);

  const newHyper = {
    name: hyper,
    createdBy: targetHyper.createdBy,
    createdAt: targetHyper.createdAt,
    favorites: [],
  };
  await User.updateOne(
    { username },
    {
      $push: {
        hypers: newHyper,
      },
    }
  );

  res.status(200).json({
    createdBy: targetHyper.createdBy,
    createdAt: targetHyper.createdAt,
  });
};

export default joinHyper;
