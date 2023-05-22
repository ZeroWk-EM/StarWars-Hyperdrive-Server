import { Request, Response } from "express";
import Technologie from "../model/technologies.model";
import ITechnologie from "../interface/technologies.interface";

export const getAllTechonologies = async (
  { query }: Request,
  res: Response
) => {
  try {
    const getAll = await Technologie.find(query);
    if(getAll) return res.status(200).json({ status: 200, technologies: getAll });
    return res
    .status(404)
    .json({ status: 404, message: "Not found technologies list" });
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const checkInfo = (req: Request, res: Response) => {
  return res.status(200).json({ status: 200, directory: "/technologies" });
};
