import { Request, Response, query } from "express";
import Serie from "../model/series.model";
import ISerie from "../interface/series.interface";

export const getAllSeries = async ({ query }: Request, res: Response) => {
  try {
    const getAll = await Serie.find(query);
    if (getAll)
      return res.status(200).json({
        status: 200,
        series: getAll,
      });
    return res
      .status(404)
      .json({ status: 404, message: "Not found series list" });
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const checkInfo = (req: Request, res: Response) => {
  return res.status(200).json({ status: 200, directory: "/series" });
};
