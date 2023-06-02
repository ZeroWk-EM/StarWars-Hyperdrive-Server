import { Request, Response } from "express";
import Technologie from "../model/technologies.model";
import Endpoint from "../model/endpoint.model";
import ITechnologie from "../interface/technologies.interface";

export const getAllTechonologies = async (req: Request, res: Response) => {
  //PAGINATION
  let urlPrev = null;
  let urlNext = null;
  const documentForPage: number = 20;
  try {
    const totalTechnologie = await Technologie.countDocuments({});
    const maxpage = Math.ceil(totalTechnologie / documentForPage);
    const pageNumber = Number(req.query.page);

    // Se non ci sono personaggi nella collection
    if (totalTechnologie === 0) {
      return res
        .status(200)
        .json({ message: "NO TECHNOLOGIE INTO COLLECTION" });
    }

    // Se non è settato il query params page
    if (!pageNumber) {
      urlNext = `http://localhost:${process.env.PORT}/v1/technologies?page=2`;
    }

    // Se esiste il query params page ed è maggiore o uguale ad 1
    if (pageNumber && pageNumber >= 1) {
      urlNext = `http://localhost:${process.env.PORT}/v1/technologies?page=${
        pageNumber + 1
      }`;
      // Se esiste il query params page è maggiore o uguale ad 2
      if (pageNumber >= 2) {
        urlPrev = `http://localhost:${process.env.PORT}/v1/technologies?page=${
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
          (urlPrev = `http://localhost:${process.env.PORT}/v1/technologies?page=${maxpage}`),
      });
    }

    // Se il numero massimo di pagine è 1 mette a null entrambe (MESSO ALLA FINE IN MODO DA SOVVRASCRIVERE LE ALTRE COSE)
    if (maxpage === 1) {
      urlPrev = null;
      urlNext = null;
    }

    const getAll = await Technologie.find(
      req.query.name ? { name: req.query.name } : {}
    )
      .skip(
        !pageNumber || pageNumber === 1 ? 0 : (pageNumber - 1) * documentForPage
      )
      .limit(documentForPage);
    if (getAll)
      return res
        .status(200)
        .json({
          maxpage,
          totalTechnologie,
          next: urlNext,
          prev: urlPrev,
          technologies: getAll,
        });
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
    if (newTechnologie) {
      await Endpoint.findOneAndUpdate(
        { title: "Technologies" },
        { counter: await Technologie.countDocuments() }
      );
      return res.status(201).json(newTechnologie);
    }
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
    await Endpoint.findOneAndUpdate(
      { title: "Technologies" },
      { counter: await Technologie.countDocuments() }
    );
    return res.status(200).json({
      status: 200,
      message: `Technologie with id = ${res.locals.id} has been deleted`,
    });
  } catch (error) {
    res.status(400).json({ error_message: error });
  }
};
