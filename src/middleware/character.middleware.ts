import { NextFunction, Request, Response } from "express";
import Movie from "../model/movies.model";

export const checkBodyValid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validKeys = Object.keys(Movie.schema.obj);
  const bodyKeys = Object.keys(req.body);
  const invalidKeys = bodyKeys.filter((key) => !validKeys.includes(key));
  if (invalidKeys.length) {
    const errorMsg = `Invalid key(s) found in request body: ${invalidKeys.join(
      ", "
    )}`;
    return res.status(400).json({ error_message: errorMsg });
  }
  next();
};
