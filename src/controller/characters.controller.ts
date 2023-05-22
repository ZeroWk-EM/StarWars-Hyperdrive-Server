import { Request, Response } from "express";
import Character from "../model/characters.model";
import ICharacter from "../interface/characters.interface";

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

export const getCharacterByID = async (_: Request, res: Response) => {
  try {
    const findByID = await Character.findById(res.locals.id);
    if (!findByID)
      return res.status(404).json({ message: "Character not found" });
    return res.status(200).json(findByID);
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const createCharacter = async ({ body }: Request, res: Response) => {
  try {
    const newCharacterBody: ICharacter = body;
    const newCharacter = await Character.create(newCharacterBody);
    if (newCharacter) return res.status(201).json(newCharacter);
    return res.status(400).json({
      error_message: "Error to creating character...Invalid key(s) or value(s)",
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error_message: error,
    });
  }
};

export const updateCharacter = async ({ body }: Request, res: Response) => {
  const id = res.locals.id;
  // Destrutturazione del body
  const {
    image,
    name,
    surname,
    height,
    weight,
    gender,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    homeworld,
    factions,
    movies,
    series,
    specie,
    vehicles,
    weapons,
  }: ICharacter = body;
  // Contiene gli attributi che hanno stringhe e numeri
  const primitiveData = {
    image,
    name,
    surname,
    height,
    weight,
    gender,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    homeworld,
  };
  // Contiene gli attributi che hanno array
  const arrayData = {
    factions,
    movies,
    series,
    specie,
    vehicles,
    weapons,
  };
  try {
    const characterToUpdate = await Character.findByIdAndUpdate(
      id,
      { $set: primitiveData, $addToSet: arrayData },
      { new: true, runValidators: true, useFindAndModify: false }
    );
    if (characterToUpdate) return res.status(200).json(characterToUpdate);
    return res.status(404).json({
      status: 404,
      error_message: "Error character to update not found",
    });
  } catch (error) {
    return res.status(400).json({ error_message: error });
  }
};

export const deleteCharacter = async (_: Request, res: Response) => {
  try {
    const characterToDelete = await Character.findByIdAndDelete(res.locals.id);
    if (!characterToDelete)
      return res.status(404).json({ error: "Character not found" });
    return res.status(200).json({
      status: 200,
      message: `Character with id = ${res.locals.id} has been deleted`,
    });
  } catch (error) {
    res.status(400).json({ error_message: error });
  }
};

export const checkInfo = (_: Request, res: Response) => {
  return res.status(200).json({ status: 200, directory: "/character" });
};
