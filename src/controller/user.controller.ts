import { Request, Response } from "express";
import User from "../model/user.model";
import IUser from "../interface/user.interface";

export const getAllUsers = async ({ query }: Request, res: Response) => {
  try {
    const getAll = await User.find(query);
    if (getAll) return res.status(200).json({ status: 200, user_list: getAll });
  } catch (error) {
    return res.status(400).send({ status: 400, error_message: error });
  }
};
