import ICreature from "../interface/creatures.interface";
import { model, Schema } from "mongoose";
import { Designation } from "../interface/enum/designation.enum";
import { EyeColor } from "../interface/enum/eye_color.enum";

const CreatureSchema = new Schema<ICreature>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    designation: {
      type: String,
      enum: Designation,
      message:
        "{VALUE} is not supported, see the documentation for see acceptable values",
      required: true,
    },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    skin_color: { type: String, required: true },
    eye_color: {
      type: String,
      enum: EyeColor,
      message:
        "{VALUE} is not supported, see the documentation for see acceptable values",
      required: true,
    },
    location: [{ type: String, required: false }],
  },
  { timestamps: true, versionKey: false }
);

export default model<ICreature>("creatures", CreatureSchema);
