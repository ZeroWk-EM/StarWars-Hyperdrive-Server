import { Request, Response, query } from "express";
import Droid from "../model/droids.model";

export const getAllDroids = async ({ query }: Request, res: Response) => {
  try {
    const getAll = await Droid.find(query);
    if (getAll) return res.status(200).json({ status: 200, droids: getAll });
    res
      .status(404)
      .json({ status: 404, message: "Don't exist droids list" });
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const checkInfo = (req: Request, res: Response) => {
  return res.status(200).json({ status: 200, directory: "/droids" });
};
