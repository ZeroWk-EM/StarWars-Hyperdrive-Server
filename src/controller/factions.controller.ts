import { Request, Response } from "express";
import Faction from "../model/factions.model";
import IFaction from "../interface/factions.interface";

export const getAllFactions = async ({ query }: Request, res: Response) => {
  try {
    const getAll = await Faction.find(query);
    if (getAll) return res.status(200).json({ status: 200, factions: getAll });
    res.status(404).json({ status: 404, message: "Don't exist factions list" });
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const getFactionByID = async (_: Request, res: Response) => {
  try {
    const findByID = await Faction.findById(res.locals.id);
    if (!findByID)
      return res.status(404).json({ message: "Faction not found" });
    return res.status(200).json(findByID);
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const createFaction = async ({ body }: Request, res: Response) => {
  try {
    const newFactionBody: IFaction = body;
    const newFaction = await Faction.create(newFactionBody);
    if (newFaction) return res.status(201).json(newFaction);
    return res.status(400).json({
      error_message: "Error to creating faction...Invalid key(s) or value(s)",
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error_message: error,
    });
  }
};

export const updateFaction = async ({ body }: Request, res: Response) => {
  const id = res.locals.id;
  // Destrutturazione del body
  const { image, name, description, planet, weapons, technology }: IFaction =
    body;
  // Contiene gli attributi che hanno stringhe e numeri
  const primitiveData = {
    image,
    name,
    description,
  };
  // Contiene gli attributi che hanno array
  const arrayData = { planet, weapons, technology };
  try {
    const factionToUpdate = await Faction.findByIdAndUpdate(
      id,
      { $set: primitiveData, $addToSet: arrayData },
      { new: true, runValidators: true, useFindAndModify: false }
    );
    if (factionToUpdate) return res.status(200).json(factionToUpdate);
    return res.status(404).json({
      status: 404,
      error_message: "Error faction to update not found",
    });
  } catch (error) {
    return res.status(400).json({ error_message: error });
  }
};

export const deleteFaction = async (_: Request, res: Response) => {
  try {
    const factionToDelete = await Faction.findByIdAndDelete(res.locals.id);
    if (!factionToDelete)
      return res.status(404).json({ error: "Faction not found" });
    return res.status(200).json({
      status: 200,
      message: `Faction with id = ${res.locals.id} has been deleted`,
    });
  } catch (error) {
    res.status(400).json({ error_message: error });
  }
};

export const checkInfo = (_: Request, res: Response) => {
  return res.status(200).json({ status: 200, directory: "/factions" });
};
