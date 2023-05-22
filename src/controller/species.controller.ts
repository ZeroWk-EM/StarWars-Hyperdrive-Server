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

export const getSpecieByID = async (_: Request, res: Response) => {
  try {
    const findByID = await Specie.findById(res.locals.id);
    if (!findByID) return res.status(404).json({ message: "Specie not found" });
    return res.status(200).json(findByID);
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const createSpecie = async ({ body }: Request, res: Response) => {
  try {
    const newSpecieBody: ISpecie = body;
    const newSpecie = await Specie.create(newSpecieBody);
    if (newSpecie) return res.status(201).json(newSpecie);
    return res.status(400).json({
      error_message: "Error to creating specie...Invalid key(s) or value(s)",
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error_message: error,
    });
  }
};

export const updateSpecie = async ({ body }: Request, res: Response) => {
  const id = res.locals.id;
  // Destrutturazione del body
  const {
    image,
    name,
    designation,
    average_height,
    skin_color,
    average_lifespan,
    homeworld,
    language,
  }: ISpecie = body;
  // Contiene gli attributi che hanno stringhe e numeri
  const primitiveData = {
    image,
    name,
    designation,
    average_height,
    skin_color,
    average_lifespan,
    homeworld,
  };
  // Contiene gli attributi che hanno array
  const arrayData = { language };
  try {
    const specieToUpdate = await Specie.findByIdAndUpdate(
      id,
      { $set: primitiveData, $addToSet: arrayData },
      { new: true, runValidators: true, useFindAndModify: false }
    );
    if (specieToUpdate) return res.status(200).json(specieToUpdate);
    return res.status(404).json({
      status: 404,
      error_message: "Error specie to update not found",
    });
  } catch (error) {
    return res.status(400).json({ error_message: error });
  }
};

export const deleteSpecie = async (_: Request, res: Response) => {
  try {
    const specieToDelete = await Specie.findByIdAndDelete(res.locals.id);
    if (!specieToDelete)
      return res.status(404).json({ error: "Specie not found" });
    return res.status(200).json({
      status: 200,
      message: `Specie with id = ${res.locals.id} has been deleted`,
    });
  } catch (error) {
    res.status(400).json({ error_message: error });
  }
};

export const checkInfo = (_: Request, res: Response) => {
  return res.status(200).json({ status: 200, directory: "/species" });
};
