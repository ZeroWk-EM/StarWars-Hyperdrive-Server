import { Request, Response } from "express";
import Weapons from "../model/weapons.model";
import Endpoint from "../model/endpoint.model";
import IWeapons from "../interface/weapons.interface";

export const getAllWeapons = async (req: Request, res: Response) => {
  //PAGINATION
  let urlPrev = null;
  let urlNext = null;
  const documentForPage: number = 20;
  try {
    const totalWeapons = await Weapons.countDocuments({});
    const maxpage = Math.ceil(totalWeapons / documentForPage);
    const pageNumber = Number(req.query.page);

    // Se non ci sono personaggi nella collection
    if (totalWeapons === 0) {
      return res.status(200).json({ message: "NO WEAPONS INTO COLLECTION" });
    }

    // Se non è settato il query params page
    if (!pageNumber) {
      urlNext = `http://localhost:${process.env.PORT}/v1/weapons?page=2`;
    }

    // Se esiste il query params page ed è maggiore o uguale ad 1
    if (pageNumber && pageNumber >= 1) {
      urlNext = `http://localhost:${process.env.PORT}/v1/weapons?page=${
        pageNumber + 1
      }`;
      // Se esiste il query params page è maggiore o uguale ad 2
      if (pageNumber >= 2) {
        urlPrev = `http://localhost:${process.env.PORT}/v1/weapons?page=${
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
          (urlPrev = `http://localhost:${process.env.PORT}/v1/weapons?page=${maxpage}`),
      });
    }

    // Se il numero massimo di pagine è 1 mette a null entrambe (MESSO ALLA FINE IN MODO DA SOVVRASCRIVERE LE ALTRE COSE)
    if (maxpage === 1) {
      urlPrev = null;
      urlNext = null;
    }

    const getAll = await Weapons.find(
      req.query.name ? { name: req.query.name } : {}
    )
      .skip(
        !pageNumber || pageNumber === 1 ? 0 : (pageNumber - 1) * documentForPage
      )
      .limit(documentForPage);
    if (getAll)
      return res.status(200).json({
        info: { maxpage, totalWeapons, next: urlNext, prev: urlPrev },
        weapons: getAll,
      });
    return res
      .status(404)
      .json({ status: 404, message: "Not found weapons list" });
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const getWeaponByID = async (_: Request, res: Response) => {
  try {
    const findByID = await Weapons.findById(res.locals.id);
    if (!findByID)
      return res.status(404).json({ message: "Weapons not found" });
    return res.status(200).json(findByID);
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const createWeapon = async ({ body }: Request, res: Response) => {
  try {
    const newWeaponsBody: IWeapons = body;
    const newWeapons = await Weapons.create(newWeaponsBody);
    if (newWeapons) {
      await Endpoint.findOneAndUpdate(
        { title: "Weapons" },
        { counter: await Weapons.countDocuments() }
      );
      return res.status(201).json(newWeapons);
    }
    return res.status(400).json({
      error_message: "Error to creating weapons...Invalid key(s) or value(s)",
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error_message: error,
    });
  }
};

export const updateWeapon = async ({ body }: Request, res: Response) => {
  const id = res.locals.id;
  // Destrutturazione del body
  const primitiveData: IWeapons = body;
  try {
    const weaponsToUpdate = await Weapons.findByIdAndUpdate(
      id,
      { $set: primitiveData },
      { new: true, runValidators: true, useFindAndModify: false }
    );
    if (weaponsToUpdate) return res.status(200).json(weaponsToUpdate);
    return res.status(404).json({
      status: 404,
      error_message: "Error weapons to update not found",
    });
  } catch (error) {
    return res.status(400).json({ error_message: error });
  }
};

export const deleteWeapon = async (_: Request, res: Response) => {
  try {
    const weaponsToDelete = await Weapons.findByIdAndDelete(res.locals.id);
    if (!weaponsToDelete)
      return res.status(404).json({ error: "Weapons not found" });
    await Endpoint.findOneAndUpdate(
      { title: "Weapons" },
      { counter: await Weapons.countDocuments() }
    );
    return res.status(200).json({
      status: 200,
      message: `Weapons with id = ${res.locals.id} has been deleted`,
    });
  } catch (error) {
    res.status(400).json({ error_message: error });
  }
};
