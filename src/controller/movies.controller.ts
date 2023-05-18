import { Request, Response } from "express";
import Movie from "../model/movies.model";

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

export const checkInfo = (req: Request, res: Response) => {
  return res.status(200).json({ status: 200, directory: "/movies" });
};
