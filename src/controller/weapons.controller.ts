import { Request, Response } from "express";
import Weapons from "../model/weapons.model";

export const getAllWeapons = async ({ query }: Request, res: Response) => {
  try {
    const getAll = await Weapons.find(query);
    if (getAll) return res.status(200).json({ status: 200, weapons: getAll });
    return res
      .status(404)
      .json({ status: 404, message: "Not found weapons list" });
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const checkInfo = (req: Request, res: Response) => {
  return res.status(200).json({ status: 200, directory: "/weapons" });
};
