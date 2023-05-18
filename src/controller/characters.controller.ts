import { Request, Response } from "express";
import Character from "../model/characters.model";

export const getAllCharacters = async ({ query }: Request, res: Response) => {
  try {
    const getAll = await Character.find(query);
    if (getAll)
      return res.status(200).json({ status: 200, characters: getAll });
    return res
      .status(404)
      .json({ status: 404, message: "Not found characters list" });
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const checkInfo = (req: Request, res: Response) => {
  return res.status(200).json({ status: 200, directory: "/character" });
};
