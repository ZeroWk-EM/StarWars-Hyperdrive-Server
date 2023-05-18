import { Request, Response } from "express";
import Vehicles from "../model/vehicles.model";

export const getAllVehicles = async ({ query }: Request, res: Response) => {
  try {
    const getAll = await Vehicles.find(query);
    if (getAll)
      return res.status(200).json({ status: 200, vehicles: getAll });
    return res
      .status(404)
      .json({ status: 404, message: "Not found vehicles list" });
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const checkInfo = (req: Request, res: Response) => {
  return res.status(200).json({ status: 200, directory: "/vehicles" });
};
