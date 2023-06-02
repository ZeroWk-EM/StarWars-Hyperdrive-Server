import { Request, Response } from "express";
import Specie from "../model/species.model";
import Endpoint from "../model/endpoint.model";
import ISpecie from "../interface/species.interface";

export const getAllSpecies = async (req: Request, res: Response) => {
  //PAGINATION
  let urlPrev = null;
  let urlNext = null;
  const documentForPage: number = 20;
  try {
    const totalSpecie = await Specie.countDocuments({});
    const maxpage = Math.ceil(totalSpecie / documentForPage);
    const pageNumber = Number(req.query.page);

    // Se non ci sono personaggi nella collection
    if (totalSpecie === 0) {
      return res.status(200).json({ message: "NO SPECIE INTO COLLECTION" });
    }

    // Se non è settato il query params page
    if (!pageNumber) {
      urlNext = `http://localhost:${process.env.PORT}/v1/species?page=2`;
    }

    // Se esiste il query params page ed è maggiore o uguale ad 1
    if (pageNumber && pageNumber >= 1) {
      urlNext = `http://localhost:${process.env.PORT}/v1/species?page=${
        pageNumber + 1
      }`;
      // Se esiste il query params page è maggiore o uguale ad 2
      if (pageNumber >= 2) {
        urlPrev = `http://localhost:${process.env.PORT}/v1/species?page=${
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
          (urlPrev = `http://localhost:${process.env.PORT}/v1/species?page=${maxpage}`),
      });
    }

    // Se il numero massimo di pagine è 1 mette a null entrambe (MESSO ALLA FINE IN MODO DA SOVVRASCRIVERE LE ALTRE COSE)
    if (maxpage === 1) {
      urlPrev = null;
      urlNext = null;
    }

    const getAll = await Specie.find(
      req.query.name ? { name: req.query.name } : {}
    )
      .skip(
        !pageNumber || pageNumber === 1 ? 0 : (pageNumber - 1) * documentForPage
      )
      .limit(documentForPage);
    if (getAll)
      return res.status(200).json({
        info: { maxpage, totalSpecie, next: urlNext, prev: urlPrev },
        species: getAll,
      });
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
    if (newSpecie) {
      await Endpoint.findOneAndUpdate(
        { title: "Species" },
        { counter: await Specie.countDocuments() }
      );
      return res.status(201).json(newSpecie);
    }
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
    await Endpoint.findOneAndUpdate(
      { title: "Species" },
      { counter: await Specie.countDocuments() }
    );
    return res.status(200).json({
      status: 200,
      message: `Specie with id = ${res.locals.id} has been deleted`,
    });
  } catch (error) {
    res.status(400).json({ error_message: error });
  }
};
