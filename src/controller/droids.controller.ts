import { Request, Response } from "express";
import Droid from "../model/droids.model";
import IDroid from "../interface/droids.interface";

export const getAllDroids = async ({ query }: Request, res: Response) => {
  try {
    const getAll = await Droid.find(query);
    if (getAll) return res.status(200).json({ status: 200, droids: getAll });
    res.status(404).json({ status: 404, message: "Don't exist droids list" });
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const getDroidByID = async (_: Request, res: Response) => {
  try {
    const findByID = await Droid.findById(res.locals.id);
    if (!findByID) return res.status(404).json({ message: "Droid not found" });
    return res.status(200).json(findByID);
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const createDroid = async ({ body }: Request, res: Response) => {
  try {
    const newDroidBody: IDroid = body;
    const newDroid = await Droid.create(newDroidBody);
    if (newDroid) return res.status(201).json(newDroid);
    return res.status(400).json({
      error_message: "Error to creating droid...Invalid key(s) or value(s)",
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error_message: error,
    });
  }
};

export const updateDroid = async ({ body }: Request, res: Response) => {
  const id = res.locals.id;
  // Destrutturazione del body
  const {
    image,
    name,
    type,
    height,
    weight,
    owner,
    factions,
    weapons,
  }: IDroid = body;
  // Contiene gli attributi che hanno stringhe e numeri
  const primitiveData = { image, name, type, height, weight, owner };
  // Contiene gli attributi che hanno array
  const arrayData = { factions, weapons };
  try {
    const droidToUpdate = await Droid.findByIdAndUpdate(
      id,
      { $set: primitiveData, $addToSet: arrayData },
      { new: true, runValidators: true, useFindAndModify: false }
    );
    if (droidToUpdate) return res.status(200).json(droidToUpdate);
    return res.status(404).json({
      status: 404,
      error_message: "Error droid to update not found",
    });
  } catch (error) {
    return res.status(400).json({ error_message: error });
  }
};

export const deleteDroid = async (_: Request, res: Response) => {
  try {
    const droidToDelete = await Droid.findByIdAndDelete(res.locals.id);
    if (!droidToDelete)
      return res.status(404).json({ error: "Droid not found" });
    return res.status(200).json({
      status: 200,
      message: `Droid with id = ${res.locals.id} has been deleted`,
    });
  } catch (error) {
    res.status(400).json({ error_message: error });
  }
};
