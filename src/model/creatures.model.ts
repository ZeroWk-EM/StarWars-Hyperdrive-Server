import { model, Schema } from "mongoose";
import ICreature from "../interface/creatures.interface";
import { DesignationEnum } from "../interface/enum/designation.enum";
import { EyeColorEnum } from "../interface/enum/eyecolor.enum";

const CreatureSchema = new Schema<ICreature>(
  {
    image: { type: String, required: false },
    name: { type: String, required: true },
    description: { type: String, required: true },
    designation: {
      type: String,
      enum: DesignationEnum,
      message:
        "{VALUE} is not supported, see the documentation for see acceptable values",
      required: true,
    },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    skin_color: { type: String, required: true },
    eye_color: {
      type: String,
      enum: EyeColorEnum,
      message:
        "{VALUE} is not supported, see the documentation for see acceptable values",
      required: true,
    },
    location: [{ type: String, required: false }],
  },
  { timestamps: true, versionKey: false }
);

export default model<ICreature>("creatures", CreatureSchema);
