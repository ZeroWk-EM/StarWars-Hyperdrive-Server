import { Request, Response, query } from "express";
import Serie from "../model/series.model";
import Endpoint from "../model/endpoint.model";
import ISerie from "../interface/series.interface";

export const getAllSeries = async (req: Request, res: Response) => {
  //PAGINATION
  let urlPrev = null;
  let urlNext = null;
  const documentForPage: number = 20;
  try {
    const totalSerie = await Serie.countDocuments({});
    const maxpage = Math.ceil(totalSerie / documentForPage);
    const pageNumber = Number(req.query.page);

    // Se non ci sono personaggi nella collection
    if (totalSerie === 0) {
      return res.status(200).json({ message: "NO SERIE INTO COLLECTION" });
    }

    // Se non è settato il query params page
    if (!pageNumber) {
      urlNext = `http://localhost:${process.env.PORT}/v1/series?page=2`;
    }

    // Se esiste il query params page ed è maggiore o uguale ad 1
    if (pageNumber && pageNumber >= 1) {
      urlNext = `http://localhost:${process.env.PORT}/v1/series?page=${
        pageNumber + 1
      }`;
      // Se esiste il query params page è maggiore o uguale ad 2
      if (pageNumber >= 2) {
        urlPrev = `http://localhost:${process.env.PORT}/v1/series?page=${
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
          (urlPrev = `http://localhost:${process.env.PORT}/v1/series?page=${maxpage}`),
      });
    }

    // Se il numero massimo di pagine è 1 mette a null entrambe (MESSO ALLA FINE IN MODO DA SOVVRASCRIVERE LE ALTRE COSE)
    if (maxpage === 1) {
      urlPrev = null;
      urlNext = null;
    }

    const getAll = await Serie.find(
      req.query.title ? { title: req.query.title } : {}
    )
      .skip(
        !pageNumber || pageNumber === 1 ? 0 : (pageNumber - 1) * documentForPage
      )
      .limit(documentForPage);
    if (getAll)
      return res.status(200).json({
        info: { maxpage, totalSerie, next: urlNext, prev: urlPrev },
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
    if (newSerie) {
      await Endpoint.findOneAndUpdate(
        { title: "Series" },
        { counter: await Serie.countDocuments() }
      );
      return res.status(201).json(newSerie);
    }
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
    Serie;
    await Endpoint.findOneAndUpdate(
      { title: "Series" },
      { counter: await Serie.countDocuments() }
    );
    return res.status(200).json({
      status: 200,
      message: `Serie with id = ${res.locals.id} has been deleted`,
    });
  } catch (error) {
    res.status(400).json({ error_message: error });
  }
};
