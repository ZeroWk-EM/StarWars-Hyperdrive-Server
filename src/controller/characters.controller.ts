import { Request, Response } from "express";
import Character from "../model/characters.model";
import Endpoint from "../model/endpoint.model";
import ICharacter from "../interface/characters.interface";

export const getAllCharacters = async (req: Request, res: Response) => {
  //PAGINATION
  let urlPrev = null;
  let urlNext = null;
  const documentForPage: number = 20;
  try {
    const totalCharacter = await Character.countDocuments({});
    const maxpage = Math.ceil(totalCharacter / documentForPage);
    const pageNumber = Number(req.query.page);

    // Se non ci sono personaggi nella collection
    if (totalCharacter === 0) {
      return res.status(200).json({ message: "NO CHARACTER INTO COLLECTION" });
    }

    // Se non è settato il query params page
    if (!pageNumber) {
      urlNext = `http://localhost:${process.env.PORT}/v1/characters?page=2`;
    }

    // Se esiste il query params page ed è maggiore o uguale ad 1
    if (pageNumber && pageNumber >= 1) {
      urlNext = `http://localhost:${process.env.PORT}/v1/characters?page=${
        pageNumber + 1
      }`;
      // Se esiste il query params page è maggiore o uguale ad 2
      if (pageNumber >= 2) {
        urlPrev = `http://localhost:${process.env.PORT}/v1/characters?page=${
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
          (urlPrev = `http://localhost:${process.env.PORT}/v1/characters?page=${maxpage}`),
      });
    }

    // Se il numero massimo di pagine è 1 mette a null entrambe (MESSO ALLA FINE IN MODO DA SOVVRASCRIVERE LE ALTRE COSE)
    if (maxpage === 1) {
      urlPrev = null;
      urlNext = null;
    }

    const getAll = await Character.find(
      req.query.name ? { name: req.query.name } : {}
    )
      .skip(
        !pageNumber || pageNumber === 1 ? 0 : (pageNumber - 1) * documentForPage
      )
      .limit(documentForPage);
    if (getAll) {
      return res.status(200).json({
        info: {
          maxpage,
          totalCharacter,
          next: urlNext,
          prev: urlPrev,
        },
        characters: getAll,
      });
    }
    return res
      .status(404)
      .json({ status: 404, message: "Not found characters list" });
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const getCharacterByID = async (_: Request, res: Response) => {
  try {
    const findByID = await Character.findById(res.locals.id);
    if (!findByID)
      return res.status(404).json({ message: "Character not found" });
    return res.status(200).json(findByID);
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const createCharacter = async ({ body }: Request, res: Response) => {
  try {
    const newCharacterBody: ICharacter = body;
    const newCharacter = await Character.create(newCharacterBody);
    if (newCharacter) {
      await Endpoint.findOneAndUpdate(
        { title: "Characters" },
        { counter: await Character.countDocuments() }
      );
      return res.status(201).json(newCharacter);
    }
    return res.status(400).json({
      error_message: "Error to creating character...Invalid key(s) or value(s)",
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error_message: error,
    });
  }
};

export const updateCharacter = async ({ body }: Request, res: Response) => {
  const id = res.locals.id;
  // Destrutturazione del body
  const {
    image,
    name,
    surname,
    height,
    weight,
    gender,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    homeworld,
    factions,
    movies,
    series,
    specie,
    vehicles,
    weapons,
  }: ICharacter = body;
  // Contiene gli attributi che hanno stringhe e numeri
  const primitiveData = {
    image,
    name,
    surname,
    height,
    weight,
    gender,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    homeworld,
  };
  // Contiene gli attributi che hanno array
  const arrayData = {
    factions,
    movies,
    series,
    specie,
    vehicles,
    weapons,
  };
  try {
    const characterToUpdate = await Character.findByIdAndUpdate(
      id,
      { $set: primitiveData, $addToSet: arrayData },
      { new: true, runValidators: true, useFindAndModify: false }
    );
    if (characterToUpdate) return res.status(200).json(characterToUpdate);
    return res.status(404).json({
      status: 404,
      error_message: "Error character to update not found",
    });
  } catch (error) {
    return res.status(400).json({ error_message: error });
  }
};

export const deleteCharacter = async (_: Request, res: Response) => {
  try {
    const characterToDelete = await Character.findByIdAndDelete(res.locals.id);
    if (!characterToDelete)
      return res.status(404).json({ error: "Character not found" });
    await Endpoint.findOneAndUpdate(
      { title: "Characters" },
      { counter: await Character.countDocuments() }
    );
    return res.status(200).json({
   
      message: `Character with id = ${res.locals.id} has been deleted`,
    });
  } catch (error) {
    res.status(400).json({ error_message: error });
  }
};
