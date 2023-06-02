import { Request, Response } from "express";
import Creature from "../model/creatures.model";
import Endpoint from "../model/endpoint.model";
import ICreature from "../interface/creatures.interface";

export const getAllCreatures = async (req: Request, res: Response) => {
  //PAGINATION
  let urlPrev = null;
  let urlNext = null;
  const documentForPage: number = 20;
  try {
    const totalCreature = await Creature.countDocuments({});
    const maxpage = Math.ceil(totalCreature / documentForPage);
    const pageNumber = Number(req.query.page);

    // Se non ci sono personaggi nella collection
    if (totalCreature === 0) {
      return res.status(200).json({ message: "NO CREATURE INTO COLLECTION" });
    }

    // Se non è settato il query params page
    if (!pageNumber) {
      urlNext = `http://localhost:${process.env.PORT}/v1/creatures?page=2`;
    }

    // Se esiste il query params page ed è maggiore o uguale ad 1
    if (pageNumber && pageNumber >= 1) {
      urlNext = `http://localhost:${process.env.PORT}/v1/creatures?page=${
        pageNumber + 1
      }`;
      // Se esiste il query params page è maggiore o uguale ad 2
      if (pageNumber >= 2) {
        urlPrev = `http://localhost:${process.env.PORT}/v1/creatures?page=${
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
          (urlPrev = `http://localhost:${process.env.PORT}/v1/creatures?page=${maxpage}`),
      });
    }

    // Se il numero massimo di pagine è 1 mette a null entrambe (MESSO ALLA FINE IN MODO DA SOVVRASCRIVERE LE ALTRE COSE)
    if (maxpage === 1) {
      urlPrev = null;
      urlNext = null;
    }

    const getAll = await Creature.find(
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
          info: { maxpage, totalCreature, next: urlNext, prev: urlPrev },
          creatures: getAll,
        });
    return res
      .status(404)
      .json({ status: 404, message: "Don't exist creatures list" });
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const getCreatureByID = async (_: Request, res: Response) => {
  try {
    const findByID = await Creature.findById(res.locals.id);
    if (!findByID)
      return res.status(404).json({ message: "Creature not found" });
    return res.status(200).json(findByID);
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const createCreature = async ({ body }: Request, res: Response) => {
  try {
    const newCreatureBody: ICreature = body;
    const newCreature = await Creature.create(newCreatureBody);
    if (newCreature) {
      await Endpoint.findOneAndUpdate(
        { title: "Creatures" },
        { counter: await Creature.countDocuments() }
      );
      return res.status(201).json(newCreature);
    }
    return res.status(400).json({
      error_message: "Error to creating creature...Invalid key(s) or value(s)",
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error_message: error,
    });
  }
};

export const updateCreature = async ({ body }: Request, res: Response) => {
  const id = res.locals.id;

  const {
    image,
    name,
    description,
    designation,
    height,
    weight,
    skin_color,
    eye_color,
    location,
  }: ICreature = body;
  const primitiveData = {
    image,
    name,
    description,
    designation,
    height,
    weight,
    skin_color,
    eye_color,
  };
  const arrayData = { location };

  try {
    const creatureToUpdate = await Creature.findByIdAndUpdate(
      id,
      { $set: primitiveData, $addToSet: arrayData },
      { new: true, runValidators: true, useFindAndModify: false }
    );
    if (creatureToUpdate) return res.status(200).json(creatureToUpdate);
    return res.status(404).json({
      status: 404,
      error_message: "Error...creature to update not found",
    });
  } catch (error) {
    return res.status(400).json({ error_message: error });
  }
};

export const deleteCreature = async (_: Request, res: Response) => {
  try {
    const creatureToDelete = await Creature.findByIdAndDelete(res.locals.id);
    if (!creatureToDelete)
      return res.status(404).json({ error: "Creature not found" });
    await Endpoint.findOneAndUpdate(
      { title: "Creatures" },
      { counter: await Creature.countDocuments() }
    );
    return res.status(200).json({
      status: 200,
      message: `Creature with id = ${res.locals.id} has been deleted`,
    });
  } catch (error) {
    res.status(400).json({ error_message: error });
  }
};
