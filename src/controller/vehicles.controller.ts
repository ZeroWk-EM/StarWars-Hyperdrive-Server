import { Request, Response } from "express";
import Vehicles from "../model/vehicles.model";
import Endpoint from "../model/endpoint.model";
import IVehicles from "../interface/vehicles.interface";

export const getAllVehicles = async (req: Request, res: Response) => {
  //PAGINATION
  let urlPrev = null;
  let urlNext = null;
  const documentForPage: number = 20;
  try {
    const totalVehicles = await Vehicles.countDocuments({});
    const maxpage = Math.ceil(totalVehicles / documentForPage);
    const pageNumber = Number(req.query.page);

    // Se non ci sono personaggi nella collection
    if (totalVehicles === 0) {
      return res.status(200).json({ message: "NO VEHICLES INTO COLLECTION" });
    }

    // Se non è settato il query params page
    if (!pageNumber) {
      urlNext = `http://localhost:${process.env.PORT}/v1/vehicles?page=2`;
    }

    // Se esiste il query params page ed è maggiore o uguale ad 1
    if (pageNumber && pageNumber >= 1) {
      urlNext = `http://localhost:${process.env.PORT}/v1/vehicles?page=${
        pageNumber + 1
      }`;
      // Se esiste il query params page è maggiore o uguale ad 2
      if (pageNumber >= 2) {
        urlPrev = `http://localhost:${process.env.PORT}/v1/vehicles?page=${
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
          (urlPrev = `http://localhost:${process.env.PORT}/v1/vehicles?page=${maxpage}`),
      });
    }

    // Se il numero massimo di pagine è 1 mette a null entrambe (MESSO ALLA FINE IN MODO DA SOVVRASCRIVERE LE ALTRE COSE)
    if (maxpage === 1) {
      urlPrev = null;
      urlNext = null;
    }

    const getAll = await Vehicles.find(
      req.query.name ? { name: req.query.name } : {}
    )
      .skip(
        !pageNumber || pageNumber === 1 ? 0 : (pageNumber - 1) * documentForPage
      )
      .limit(documentForPage);
    if (getAll)
      return res.status(200).json({
        info: { maxpage, totalVehicles, next: urlNext, prev: urlPrev },
        vehicles: getAll,
      });
    return res
      .status(404)
      .json({ status: 404, message: "Not found vehicles list" });
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const getVehicleByID = async (_: Request, res: Response) => {
  try {
    const findByID = await Vehicles.findById(res.locals.id);
    if (!findByID)
      return res.status(404).json({ message: "Vehicles not found" });
    return res.status(200).json(findByID);
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const createVehicle = async ({ body }: Request, res: Response) => {
  try {
    const newVehiclesBody: IVehicles = body;
    const newVehicles = await Vehicles.create(newVehiclesBody);
    if (newVehicles) {
      await Endpoint.findOneAndUpdate(
        { title: "Vehicles" },
        { counter: await Vehicles.countDocuments() }
      );
      return res.status(201).json(newVehicles);
    }
    return res.status(400).json({
      error_message: "Error to creating vehicles...Invalid key(s) or value(s)",
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error_message: error,
    });
  }
};

export const updateVehicle = async ({ body }: Request, res: Response) => {
  const id = res.locals.id;
  // Destrutturazione del body
  const primitiveData: IVehicles = body;
  try {
    const vehiclesToUpdate = await Vehicles.findByIdAndUpdate(
      id,
      { $set: primitiveData },
      { new: true, runValidators: true, useFindAndModify: false }
    );
    if (vehiclesToUpdate) return res.status(200).json(vehiclesToUpdate);
    return res.status(404).json({
      status: 404,
      error_message: "Error vehicles to update not found",
    });
  } catch (error) {
    return res.status(400).json({ error_message: error });
  }
};

export const deleteVehicle = async (_: Request, res: Response) => {
  try {
    const vehiclesToDelete = await Vehicles.findByIdAndDelete(res.locals.id);
    if (!vehiclesToDelete)
      return res.status(404).json({ error: "Vehicles not found" });
    await Endpoint.findOneAndUpdate(
      { title: "Vehicles" },
      { counter: await Vehicles.countDocuments() }
    );
    return res.status(200).json({
      status: 200,
      message: `Vehicles with id = ${res.locals.id} has been deleted`,
    });
  } catch (error) {
    res.status(400).json({ error_message: error });
  }
};
