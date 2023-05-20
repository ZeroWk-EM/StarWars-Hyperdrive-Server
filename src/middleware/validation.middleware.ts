import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

export const checkIdValid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = String(req.params.id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ObjectId" });
  }
  res.locals.id = id;
  next();
};
