import { Request, Response } from "express";
import Technologie from "../model/technologies.model";
import ITechnologie from "../interface/technologies.interface";

export const getAllTechonologies = async (
  { query }: Request,
  res: Response
) => {
  try {
    const getAll = await Technologie.find(query);
    if (getAll)
      return res.status(200).json({ status: 200, technologies: getAll });
    return res
      .status(404)
      .json({ status: 404, message: "Not found technologies list" });
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const getTechnologieByID = async (_: Request, res: Response) => {
  try {
    const findByID = await Technologie.findById(res.locals.id);
    if (!findByID)
      return res.status(404).json({ message: "Technologie not found" });
    return res.status(200).json(findByID);
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const createTechnologie = async ({ body }: Request, res: Response) => {
  try {
    const newTechnologieBody: ITechnologie = body;
    const newTechnologie = await Technologie.create(newTechnologieBody);
    if (newTechnologie) return res.status(201).json(newTechnologie);
    return res.status(400).json({
      error_message:
        "Error to creating technologie...Invalid key(s) or value(s)",
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error_message: error,
    });
  }
};

export const updateTechnologie = async ({ body }: Request, res: Response) => {
  const id = res.locals.id;
  // Destrutturazione del body
  const primitiveData: ITechnologie = body;
  try {
    const technologieToUpdate = await Technologie.findByIdAndUpdate(
      id,
      { $set: primitiveData },
      { new: true, runValidators: true, useFindAndModify: false }
    );
    if (technologieToUpdate) return res.status(200).json(technologieToUpdate);
    return res.status(404).json({
      status: 404,
      error_message: "Error technologie to update not found",
    });
  } catch (error) {
    return res.status(400).json({ error_message: error });
  }
};

export const deleteTechnologie = async (_: Request, res: Response) => {
  try {
    const technologieToDelete = await Technologie.findByIdAndDelete(
      res.locals.id
    );
    if (!technologieToDelete)
      return res.status(404).json({ error: "Technologie not found" });
    return res.status(200).json({
      status: 200,
      message: `Technologie with id = ${res.locals.id} has been deleted`,
    });
  } catch (error) {
    res.status(400).json({ error_message: error });
  }
};

export const checkInfo = (_: Request, res: Response) => {
  return res.status(200).json({ status: 200, directory: "/technologies" });
};
