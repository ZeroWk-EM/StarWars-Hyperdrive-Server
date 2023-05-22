import { Request, Response } from "express";
import Creature from "../model/creatures.model";
import ICreature from "../interface/creatures.interface";

export const getAllCreatures = async ({ query }: Request, res: Response) => {
  try {
    const getAll = await Creature.find(query);
    if (getAll) return res.status(200).json({ status: 200, creatures: getAll });
    return res
      .status(404)
      .json({ status: 404, message: "Don't exist creatures list" });
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const getCreatureByID = async (_: Request, res: Response) => {
  try {
    const findByID = await Creature.findById(res.locals.id);
    if (!findByID)
      return res.status(404).json({ message: "Creature not found" });
    return res.status(200).json(findByID);
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const createCreature = async ({ body }: Request, res: Response) => {
  try {
    const newCreatureBody: ICreature = body;
    const newCreature = await Creature.create(newCreatureBody);
    if (newCreature) return res.status(201).json(newCreature);
    return res.status(400).json({
      error_message: "Error to creating creature...Invalid key(s) or value(s)",
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error_message: error,
    });
  }
};

export const updateCreature = async ({ body }: Request, res: Response) => {
  const id = res.locals.id;

  const {
    image,
    name,
    description,
    designation,
    height,
    weight,
    skin_color,
    eye_color,
    location,
  }: ICreature = body;
  const primitiveData = {
    image,
    name,
    description,
    designation,
    height,
    weight,
    skin_color,
    eye_color,
  };
  const arrayData = { location };

  try {
    const creatureToUpdate = await Creature.findByIdAndUpdate(
      id,
      { $set: primitiveData, $addToSet: arrayData },
      { new: true, runValidators: true, useFindAndModify: false }
    );
    if (creatureToUpdate) return res.status(200).json(creatureToUpdate);
    return res.status(404).json({
      status: 404,
      error_message: "Error...creature to update not found",
    });
  } catch (error) {
    return res.status(400).json({ error_message: error });
  }
};

export const deleteCreature = async (_: Request, res: Response) => {
  try {
    const creatureToDelete = await Creature.findByIdAndDelete(res.locals.id);
    if (!creatureToDelete)
      return res.status(404).json({ error: "Creature not found" });
    return res.status(200).json({
      status: 200,
      message: `Creature with id = ${res.locals.id} has been deleted`,
    });
  } catch (error) {
    res.status(400).json({ error_message: error });
  }
};
