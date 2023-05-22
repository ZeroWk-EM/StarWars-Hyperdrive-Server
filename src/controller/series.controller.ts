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

export const getSerieByID = async (_: Request, res: Response) => {
  try {
    const findByID = await Serie.findById(res.locals.id);
    if (!findByID) return res.status(404).json({ message: "Serie not found" });
    return res.status(200).json(findByID);
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const createSerie = async ({ body }: Request, res: Response) => {
  try {
    const newSerieBody: ISerie = body;
    const newSerie = await Serie.create(newSerieBody);
    if (newSerie) return res.status(201).json(newSerie);
    return res.status(400).json({
      error_message: "Error to creating serie...Invalid key(s) or value(s)",
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error_message: error,
    });
  }
};

export const updateSerie = async ({ body }: Request, res: Response) => {
  const id = res.locals.id;
  // Destrutturazione del body
  const {
    image,
    title,
    seasons,
    total_episodes,
    director,
    producer,
    release_date,
    end_date,
    characters,
    droid,
    vehicles,
  }: ISerie = body;
  // Contiene gli attributi che hanno stringhe e numeri
  const primitiveData = {
    image,
    title,
    seasons,
    total_episodes,
    director,
    producer,
    release_date,
    end_date,
  };
  // Contiene gli attributi che hanno array
  const arrayData = {
    characters,
    droid,
    vehicles,
  };
  try {
    const serieToUpdate = await Serie.findByIdAndUpdate(
      id,
      { $set: primitiveData, $addToSet: arrayData },
      { new: true, runValidators: true, useFindAndModify: false }
    );
    if (serieToUpdate) return res.status(200).json(serieToUpdate);
    return res.status(404).json({
      status: 404,
      error_message: "Error serie to update not found",
    });
  } catch (error) {
    return res.status(400).json({ error_message: error });
  }
};

export const deleteSerie = async (_: Request, res: Response) => {
  try {
    const serieToDelete = await Serie.findByIdAndDelete(res.locals.id);
    if (!serieToDelete)
      return res.status(404).json({ error: "Serie not found" });
    return res.status(200).json({
      status: 200,
      message: `Serie with id = ${res.locals.id} has been deleted`,
    });
  } catch (error) {
    res.status(400).json({ error_message: error });
  }
};

