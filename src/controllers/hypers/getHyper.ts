import { Request, Response } from "express";
import Hyper from "../../models/Hyper";

const getHyper = async (req: Request, res: Response) => {
  const { hyperName } = req.params;

  const hyper = await Hyper.findOne({ name: hyperName });

  if (!hyper) return res.sendStatus(404);

  res.status(200).json({ hyper });
};

export default getHyper;
