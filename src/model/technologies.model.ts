import ITechnologie from "../interface/technologies.interface";
import { model, Schema } from "mongoose";

const TechnologieSchema = new Schema<ITechnologie>(
  {},
  { timestamps: true, versionKey: false }
);

export default model<ITechnologie>("technologie", TechnologieSchema);
