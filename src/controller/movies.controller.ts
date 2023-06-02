import { Request, Response } from "express";
import Movie from "../model/movies.model";
import Endpoint from "../model/endpoint.model";
import IMovie from "../interface/movies.interface";

export const getAllMovies = async (req: Request, res: Response) => {
  //PAGINATION
  let urlPrev = null;
  let urlNext = null;
  const documentForPage: number = 20;
  try {
    const totalMovie = await Movie.countDocuments({});
    const maxpage = Math.ceil(totalMovie / documentForPage);
    const pageNumber = Number(req.query.page);

    // Se non ci sono personaggi nella collection
    if (totalMovie === 0) {
      return res.status(200).json({ message: "NO MOVIE INTO COLLECTION" });
    }

    // Se non è settato il query params page
    if (!pageNumber) {
      urlNext = `http://localhost:${process.env.PORT}/v1/movies?page=2`;
    }

    // Se esiste il query params page ed è maggiore o uguale ad 1
    if (pageNumber && pageNumber >= 1) {
      urlNext = `http://localhost:${process.env.PORT}/v1/movies?page=${
        pageNumber + 1
      }`;
      // Se esiste il query params page è maggiore o uguale ad 2
      if (pageNumber >= 2) {
        urlPrev = `http://localhost:${process.env.PORT}/v1/movies?page=${
          pageNumber - 1
        }`;
      }
    }

    // Se il numero attuale di pagione e uguale al numero massimo di pagine
    if (pageNumber === maxpage) {
      urlNext = null;
      // Se si prova a mettere un numero manualemente come query param di page
    } else if (pageNumber > maxpage) {
      return res.status(200).json({
        message: "No more character",
        urlPrev:
          (urlPrev = `http://localhost:${process.env.PORT}/v1/movies?page=${maxpage}`),
      });
    }

    // Se il numero massimo di pagine è 1 mette a null entrambe (MESSO ALLA FINE IN MODO DA SOVVRASCRIVERE LE ALTRE COSE)
    if (maxpage === 1) {
      urlPrev = null;
      urlNext = null;
    }

    const getAll = await Movie.find(
      req.query.name ? { name: req.query.name } : {}
    )
      .skip(
        !pageNumber || pageNumber === 1 ? 0 : (pageNumber - 1) * documentForPage
      )
      .limit(documentForPage);
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
    if (newMovie) {
      await Endpoint.findOneAndUpdate(
        { title: "Movies" },
        { counter: await Movie.countDocuments() }
      );
      return res.status(201).json(newMovie);
    }
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
    await Endpoint.findOneAndUpdate(
      { title: "Movies" },
      { counter: await Movie.countDocuments() }
    );
    return res.status(200).json({
      status: 200,
      message: `Movie with id = ${res.locals.id} has been deleted`,
    });
  } catch (error) {
    res.status(400).json({ error_message: error });
  }
};
