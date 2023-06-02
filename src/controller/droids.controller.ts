import { Request, Response } from "express";
import Droid from "../model/droids.model";
import Endpoint from "../model/endpoint.model";
import IDroid from "../interface/droids.interface";

export const getAllDroids = async (req: Request, res: Response) => {
  //PAGINATION
  let urlPrev = null;
  let urlNext = null;
  const documentForPage: number = 20;
  try {
    const totalDroid = await Droid.countDocuments({});
    const maxpage = Math.ceil(totalDroid / documentForPage);
    const pageNumber = Number(req.query.page);

    // Se non ci sono personaggi nella collection
    if (totalDroid === 0) {
      return res.status(200).json({ message: "NO DROID INTO COLLECTION" });
    }

    // Se non è settato il query params page
    if (!pageNumber) {
      urlNext = `http://localhost:${process.env.PORT}/v1/droids?page=2`;
    }

    // Se esiste il query params page ed è maggiore o uguale ad 1
    if (pageNumber && pageNumber >= 1) {
      urlNext = `http://localhost:${process.env.PORT}/v1/droids?page=${
        pageNumber + 1
      }`;
      // Se esiste il query params page è maggiore o uguale ad 2
      if (pageNumber >= 2) {
        urlPrev = `http://localhost:${process.env.PORT}/v1/droids?page=${
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
          (urlPrev = `http://localhost:${process.env.PORT}/v1/droids?page=${maxpage}`),
      });
    }

    // Se il numero massimo di pagine è 1 mette a null entrambe (MESSO ALLA FINE IN MODO DA SOVVRASCRIVERE LE ALTRE COSE)
    if (maxpage === 1) {
      urlPrev = null;
      urlNext = null;
    }

    const getAll = await Droid.find(req.query.name ? { name: req.query.name } : {})
      .skip(
        !pageNumber || pageNumber === 1 ? 0 : (pageNumber - 1) * documentForPage
      )
      .limit(documentForPage);
    if (getAll)
      return res.status(200).json({
        maxpage,
        totalDroid,
        next: urlNext,
        prev: urlPrev,
        droids: getAll,
      });
    res.status(404).json({ status: 404, message: "Don't exist droids list" });
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const getDroidByID = async (_: Request, res: Response) => {
  try {
    const findByID = await Droid.findById(res.locals.id);
    if (!findByID) return res.status(404).json({ message: "Droid not found" });
    return res.status(200).json(findByID);
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const createDroid = async ({ body }: Request, res: Response) => {
  try {
    const newDroidBody: IDroid = body;
    const newDroid = await Droid.create(newDroidBody);
    if (newDroid) {
      await Endpoint.findOneAndUpdate(
        { title: "Droids" },
        { counter: await Droid.countDocuments() }
      );
      return res.status(201).json(newDroid);
    }
    return res.status(400).json({
      error_message: "Error to creating droid...Invalid key(s) or value(s)",
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error_message: error,
    });
  }
};

export const updateDroid = async ({ body }: Request, res: Response) => {
  const id = res.locals.id;
  // Destrutturazione del body
  const {
    image,
    name,
    type,
    height,
    weight,
    owner,
    factions,
    weapons,
  }: IDroid = body;
  // Contiene gli attributi che hanno stringhe e numeri
  const primitiveData = { image, name, type, height, weight, owner };
  // Contiene gli attributi che hanno array
  const arrayData = { factions, weapons };
  try {
    const droidToUpdate = await Droid.findByIdAndUpdate(
      id,
      { $set: primitiveData, $addToSet: arrayData },
      { new: true, runValidators: true, useFindAndModify: false }
    );
    if (droidToUpdate) return res.status(200).json(droidToUpdate);
    return res.status(404).json({
      status: 404,
      error_message: "Error droid to update not found",
    });
  } catch (error) {
    return res.status(400).json({ error_message: error });
  }
};

export const deleteDroid = async (_: Request, res: Response) => {
  try {
    const droidToDelete = await Droid.findByIdAndDelete(res.locals.id);
    if (!droidToDelete)
      return res.status(404).json({ error: "Droid not found" });
    await Endpoint.findOneAndUpdate(
      { title: "Droids" },
      { counter: await Droid.countDocuments() }
    );
    return res.status(200).json({
      status: 200,
      message: `Droid with id = ${res.locals.id} has been deleted`,
    });
  } catch (error) {
    res.status(400).json({ error_message: error });
  }
};
