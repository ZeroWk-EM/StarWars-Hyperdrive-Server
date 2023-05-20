import IDroid from "../interface/droids.interface";
import { model, Schema } from "mongoose";
import { DroidEnum } from "../interface/enum/droid.enum";

const DroidSchema = new Schema<IDroid>(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: DroidEnum,
      message:
        "{VALUE} is not supported, see the documentation for see acceptable values",
      required: true,
    },
    height: { type: Number, required: false },
    weight: { type: Number, required: false },
    owner: { type: String, required: false },
    factions: [{ type: String, required: true }],
    weapons: [{ type: String, required: false }],
  },
  { timestamps: true, versionKey: false }
);

export default model<IDroid>("droids", DroidSchema);
