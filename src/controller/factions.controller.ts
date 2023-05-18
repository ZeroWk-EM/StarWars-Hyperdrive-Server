import { Request, Response } from "express";
import Faction from "../model/factions.model";

export const getAllFactions = async ({ query }: Request, res: Response) => {
  try {
    const getAll = await Faction.find(query);
    if (getAll) return res.status(200).json({ status: 200, factions: getAll });
    res
      .status(404)
      .json({ status: 404, message: "Don't exist factions list" });
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const checkInfo = (req: Request, res: Response) => {
  return res.status(200).json({ status: 200, directory: "/factions" });
};
