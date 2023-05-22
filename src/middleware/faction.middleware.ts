import { NextFunction, Request, Response } from "express";
import Faction from "../model/factions.model";

export const checkBodyValid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Take key into che user schema
  const validKeys = Object.keys(Faction.schema.obj);

  // Take key into the body
  const bodyKeys = Object.keys(req.body);

  // Compare validKeys and bodyKeys
  const invalidKeys = bodyKeys.filter((key) => !validKeys.includes(key));

  // Se sono presenti chiavi non valide, restituisci un errore
  if (invalidKeys.length) {
    const errorMsg = `Invalid key(s) found in request body: ${invalidKeys.join(
      ", "
    )}`;
    return res.status(400).json({ error_message: errorMsg });
  }
  next();
};
