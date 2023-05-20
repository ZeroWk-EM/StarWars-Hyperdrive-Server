import { Request, Response, json } from "express";
import ICharacter from "../interface/characters.interface";
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

export const getCharacterByID = async (req: Request, res: Response) => {
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
  const characterToUpdate: ICharacter = body;
  /* 
    const oldValue = await Character.findById(id, { _id: 0, movies: 1 });
    const array = oldValue?.movies;
    const newarray = array ? [...array, ...characterToUpdate.movies] : characterToUpdate.movies;
  */
  // IF IS ARRAY
  if (body.movies) {
    try {
      const characterUpdate = await Character.findByIdAndUpdate(
        id,
        { $set: { movies: characterToUpdate.movies } },
        { new: true, runValidators: true, useFindAndModify: false }
      );
      console.log(characterUpdate);
      if (characterUpdate) return res.status(200).json(characterUpdate);
      return res.status(400).json({
        status: 400,
        error_message: "Error to update character",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error_message: error });
    }
  }
  // IF IS A STRING OR NUMBER
  try {
    const characterUpdate = await Character.findByIdAndUpdate(
      id,
      { $set: characterToUpdate },
      { new: true, runValidators: true, useFindAndModify: false }
    );
    if (characterUpdate) return res.status(200).json(characterUpdate);
    return res.status(400).json({
      status: 400,
      error_message: "Error to update character",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error_message: error });
  }
};

export const deleteCharacter = async (req: Request, res: Response) => {
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

export const checkInfo = (req: Request, res: Response) => {
  return res.status(200).json({ status: 200, directory: "/character" });
};
