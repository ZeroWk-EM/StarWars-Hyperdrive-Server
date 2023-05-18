import { Request, Response } from "express";
import Creature from "../model/creatures.model";

export const getAllCreatures = async ({ query }: Request, res: Response) => {
  try {
    const getAll = await Creature.find(query);
    if (getAll) return res.status(200).json({ status: 200, creatures: getAll });
    return res
    .status(404)
    .json({ status: 404, message: "Don't exist creatures list" });
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const checkInfo = (_: Request, res: Response) => {
  return res.status(200).json({ status: 200, directory: "/creatures" });
};
