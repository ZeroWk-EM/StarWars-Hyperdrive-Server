import { model, Schema } from "mongoose";
import ISpecie from "../interface/species.interface";
import { DesignationEnum } from "../interface/enum/designation.enum";

const SpecieSchema = new Schema<ISpecie>(
  {
    image: { type: String, required: false },
    name: { type: String, required: true },
    designation: {
      type: String,
      enum: DesignationEnum,
      message:
        "{VALUE} is not supported, see the documentation for see acceptable values",

      required: true,
    },
    average_height: { type: Number, required: true },
    skin_color: { type: String, required: true },
    average_lifespan: { type: Number, required: true },
    homeworld: { type: String, required: true },
    language: [{ type: String, required: true }],
  },
  { timestamps: true, versionKey: false }
);

export default model<ISpecie>("species", SpecieSchema);
