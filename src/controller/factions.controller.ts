import { Request, Response } from "express";
import Faction from "../model/factions.model";
import Endpoint from "../model/endpoint.model";
import IFaction from "../interface/factions.interface";

export const getAllFactions = async (req: Request, res: Response) => {
  //PAGINATION
  let urlPrev = null;
  let urlNext = null;
  const documentForPage: number = 20;
  try {
    const totalFaction = await Faction.countDocuments({});
    const maxpage = Math.ceil(totalFaction / documentForPage);
    const pageNumber = Number(req.query.page);

    // Se non ci sono personaggi nella collection
    if (totalFaction === 0) {
      return res.status(200).json({ message: "NO FACTION INTO COLLECTION" });
    }

    // Se non è settato il query params page
    if (!pageNumber) {
      urlNext = `http://localhost:${process.env.PORT}/v1/factions?page=2`;
    }

    // Se esiste il query params page ed è maggiore o uguale ad 1
    if (pageNumber && pageNumber >= 1) {
      urlNext = `http://localhost:${process.env.PORT}/v1/factions?page=${
        pageNumber + 1
      }`;
      // Se esiste il query params page è maggiore o uguale ad 2
      if (pageNumber >= 2) {
        urlPrev = `http://localhost:${process.env.PORT}/v1/factions?page=${
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
          (urlPrev = `http://localhost:${process.env.PORT}/v1/factions?page=${maxpage}`),
      });
    }

    // Se il numero massimo di pagine è 1 mette a null entrambe (MESSO ALLA FINE IN MODO DA SOVVRASCRIVERE LE ALTRE COSE)
    if (maxpage === 1) {
      urlPrev = null;
      urlNext = null;
    }

    const getAll = await Faction.find(
      req.query.name ? { name: req.query.name } : {}
    )
      .skip(
        !pageNumber || pageNumber === 1 ? 0 : (pageNumber - 1) * documentForPage
      )
      .limit(documentForPage);
    if (getAll)
      return res.status(200).json({
        info: { maxpage, totalFaction, next: urlNext, prev: urlPrev },
        factions: getAll,
      });
    res.status(404).json({ status: 404, message: "Don't exist factions list" });
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const getFactionByID = async (_: Request, res: Response) => {
  try {
    const findByID = await Faction.findById(res.locals.id);
    if (!findByID)
      return res.status(404).json({ message: "Faction not found" });
    return res.status(200).json(findByID);
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const createFaction = async ({ body }: Request, res: Response) => {
  try {
    const newFactionBody: IFaction = body;
    const newFaction = await Faction.create(newFactionBody);
    if (newFaction) {
      await Endpoint.findOneAndUpdate(
        { title: "Factions" },
        { counter: await Faction.countDocuments() }
      );
      return res.status(201).json(newFaction);
    }
    return res.status(400).json({
      error_message: "Error to creating faction...Invalid key(s) or value(s)",
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error_message: error,
    });
  }
};

export const updateFaction = async ({ body }: Request, res: Response) => {
  const id = res.locals.id;
  // Destrutturazione del body
  const { image, name, description, planet, weapons, technology }: IFaction =
    body;
  // Contiene gli attributi che hanno stringhe e numeri
  const primitiveData = {
    image,
    name,
    description,
  };
  // Contiene gli attributi che hanno array
  const arrayData = { planet, weapons, technology };
  try {
    const factionToUpdate = await Faction.findByIdAndUpdate(
      id,
      { $set: primitiveData, $addToSet: arrayData },
      { new: true, runValidators: true, useFindAndModify: false }
    );
    if (factionToUpdate) return res.status(200).json(factionToUpdate);
    return res.status(404).json({
      status: 404,
      error_message: "Error faction to update not found",
    });
  } catch (error) {
    return res.status(400).json({ error_message: error });
  }
};

export const deleteFaction = async (_: Request, res: Response) => {
  try {
    const factionToDelete = await Faction.findByIdAndDelete(res.locals.id);
    if (!factionToDelete)
      return res.status(404).json({ error: "Faction not found" });
    await Endpoint.findOneAndUpdate(
      { title: "Factions" },
      { counter: await Faction.countDocuments() }
    );
    return res.status(200).json({
      status: 200,
      message: `Faction with id = ${res.locals.id} has been deleted`,
    });
  } catch (error) {
    res.status(400).json({ error_message: error });
  }
};
