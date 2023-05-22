import { Request, Response } from "express";
import Specie from "../model/species.model";
import ISpecie from "../interface/species.interface";

export const getAllSpecies = async ({ query }: Request, res: Response) => {
  try {
    const getAll = await Specie.find(query);
    if (getAll) return res.status(200).json({ status: 200, species: getAll });
    return res
      .status(404)
      .json({ status: 404, message: "Not found species list" });
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const checkInfo = (req: Request, res: Response) => {
  return res.status(200).json({ status: 200, directory: "/species" });
};
