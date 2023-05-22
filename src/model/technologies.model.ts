import { model, Schema } from "mongoose";
import ITechnologie from "../interface/technologies.interface";

const TechnologieSchema = new Schema<ITechnologie>(
  {
    image: { type: String, required: false },
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export default model<ITechnologie>("technologie", TechnologieSchema);
