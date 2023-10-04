import { Request, Response } from "express";
import Hyper from "../../models/Hyper";

const getHyper = async (req: Request, res: Response) => {
  const { hyper } = req.params;

  const targetHyper = await Hyper.findOne({ name: hyper });

  if (!targetHyper) return res.sendStatus(404);

  res.status(200).json({ hyper: targetHyper });
};

export default getHyper;
