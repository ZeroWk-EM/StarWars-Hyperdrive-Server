import { Request, Response } from "express";
import Vehicles from "../model/vehicles.model";
import IVehicles from "../interface/vehicles.interface";

export const getAllVehicles = async ({ query }: Request, res: Response) => {
  try {
    const getAll = await Vehicles.find(query);
    if (getAll) return res.status(200).json({ status: 200, vehicles: getAll });
    return res
      .status(404)
      .json({ status: 404, message: "Not found vehicles list" });
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const getVehiclesByID = async (_: Request, res: Response) => {
  try {
    const findByID = await Vehicles.findById(res.locals.id);
    if (!findByID)
      return res.status(404).json({ message: "Vehicles not found" });
    return res.status(200).json(findByID);
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const createVehicles = async ({ body }: Request, res: Response) => {
  try {
    const newVehiclesBody: IVehicles = body;
    const newVehicles = await Vehicles.create(newVehiclesBody);
    if (newVehicles) return res.status(201).json(newVehicles);
    return res.status(400).json({
      error_message: "Error to creating vehicles...Invalid key(s) or value(s)",
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error_message: error,
    });
  }
};

export const updateVehicles = async ({ body }: Request, res: Response) => {
  const id = res.locals.id;
  // Destrutturazione del body
  const primitiveData: IVehicles = body;
  try {
    const vehiclesToUpdate = await Vehicles.findByIdAndUpdate(
      id,
      { $set: primitiveData },
      { new: true, runValidators: true, useFindAndModify: false }
    );
    if (vehiclesToUpdate) return res.status(200).json(vehiclesToUpdate);
    return res.status(404).json({
      status: 404,
      error_message: "Error vehicles to update not found",
    });
  } catch (error) {
    return res.status(400).json({ error_message: error });
  }
};

export const deleteVehicles = async (_: Request, res: Response) => {
  try {
    const vehiclesToDelete = await Vehicles.findByIdAndDelete(res.locals.id);
    if (!vehiclesToDelete)
      return res.status(404).json({ error: "Vehicles not found" });
    return res.status(200).json({
      status: 200,
      message: `Vehicles with id = ${res.locals.id} has been deleted`,
    });
  } catch (error) {
    res.status(400).json({ error_message: error });
  }
};

