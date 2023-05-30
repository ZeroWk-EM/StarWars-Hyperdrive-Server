import { Request, Response } from "express";
import Endpoint from "../model/endpoint.model";
import { IEndpoint } from "../interface/endpoint.interface";

export const getAllEndpoints = async (_: Request, res: Response) => {
  try {
    const getAll = await Endpoint.find({});
    if (getAll) return res.status(200).json(getAll);
    return res
      .status(404)
      .json({ status: 404, message: "Don't exist endpoint list" });
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const getEndpointByID = async (_: Request, res: Response) => {
  try {
    const findByID = await Endpoint.findById(res.locals.id);
    if (!findByID)
      return res.status(404).json({ message: "Endpoint not found" });
    return res.status(200).json(findByID);
  } catch (error) {
    return res.status(400).json({ status: 400, error_message: error });
  }
};

export const createEndpoint = async ({ body }: Request, res: Response) => {
  try {
    const newEndpointBody: IEndpoint = body;
    const newEndpoint = await Endpoint.create(newEndpointBody);
    if (newEndpoint) return res.status(201).json(newEndpoint);
    return res.status(400).json({
      error_message: "Error to creating endpoint...Invalid key(s) or value(s)",
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error_message: error,
    });
  }
};

export const updateEndpoint = async ({ body }: Request, res: Response) => {
  const endpointToUpdate: IEndpoint = body;
  try {
    const updateData = await Endpoint.findOneAndUpdate(
      { _id: res.locals.id },
      { $set: endpointToUpdate },
      { new: true, runValidators: true, useFindAndModify: false }
    );
    if (updateData) return res.status(200).json(updateData);
  } catch (error) {
    return res.status(400).json({ error_message: error });
  }
};

export const deleteEndpoint = async (_: Request, res: Response) => {
  try {
    const creatureToDelete = await Endpoint.findByIdAndDelete(res.locals.id);
    if (!creatureToDelete)
      return res.status(404).json({ error: "Endpoint not found" });
    return res.status(200).json({
      status: 200,
      message: `Endpoint with id = ${res.locals.id} has been deleted`,
    });
  } catch (error) {
    res.status(400).json({ error_message: error });
  }
};
