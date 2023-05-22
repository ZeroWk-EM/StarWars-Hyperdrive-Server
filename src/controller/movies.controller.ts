import { Request, Response } from "express";
import Movie from "../model/movies.model";
import IMovie from "../interface/movies.interface";

export const getAllMovies = async ({ query }: Request, res: Response) => {
  try {
    const getAll = await Movie.find(query);
    if (getAll) return res.status(200).json({ status: 200, movies: getAll });
    return res
      .status(404)
      .json({ status: 404, message: "Not found movies list" });
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const getMovieByID = async (_: Request, res: Response) => {
  try {
    const findByID = await Movie.findById(res.locals.id);
    if (!findByID) return res.status(404).json({ message: "Movie not found" });
    return res.status(200).json(findByID);
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const createMovie = async ({ body }: Request, res: Response) => {
  try {
    const newMovieBody: IMovie = body;
    const newMovie = await Movie.create(newMovieBody);
    if (newMovie) return res.status(201).json(newMovie);
    return res.status(400).json({
      error_message: "Error to creating movie...Invalid key(s) or value(s)",
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error_message: error,
    });
  }
};

export const updateMovie = async ({ body }: Request, res: Response) => {
  const id = res.locals.id;
  // Destrutturazione del body
  const {
    image,
    title,
    episode_id,
    opening_crawl,
    director,
    producer,
    release_date,
    characters,
    droid,
    vehicles,
  }: IMovie = body;
  // Contiene gli attributi che hanno stringhe e numeri
  const primitiveData = {
    image,
    title,
    episode_id,
    opening_crawl,
    director,
    producer,
    release_date,
  };
  // Contiene gli attributi che hanno array
  const arrayData = {
    characters,
    droid,
    vehicles,
  };
  try {
    const movieToUpdate = await Movie.findByIdAndUpdate(
      id,
      { $set: primitiveData, $addToSet: arrayData },
      { new: true, runValidators: true, useFindAndModify: false }
    );
    if (movieToUpdate) return res.status(200).json(movieToUpdate);
    return res.status(404).json({
      status: 404,
      error_message: "Error movie to update not found",
    });
  } catch (error) {
    return res.status(400).json({ error_message: error });
  }
};

export const deleteMovie = async (_: Request, res: Response) => {
  try {
    const movieToDelete = await Movie.findByIdAndDelete(res.locals.id);
    if (!movieToDelete)
      return res.status(404).json({ error: "Movie not found" });
    return res.status(200).json({
      status: 200,
      message: `Movie with id = ${res.locals.id} has been deleted`,
    });
  } catch (error) {
    res.status(400).json({ error_message: error });
  }
};

