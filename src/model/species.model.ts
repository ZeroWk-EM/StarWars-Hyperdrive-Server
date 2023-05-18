import ISpecie from "../interface/species.interface";
import { model, Schema } from "mongoose";

const SpecieSchema = new Schema<ISpecie>(
  {},
  { timestamps: true, versionKey: false }
);

export default model<ISpecie>("species", SpecieSchema);
