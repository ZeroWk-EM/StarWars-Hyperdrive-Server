import { model, Schema } from "mongoose";
import IFaction from "../interface/factions.interface";

const FactionSchema = new Schema<IFaction>(
  {
    image: { type: String, required: false },
    name: { type: String, required: true },
    description: { type: String, required: true },
    planet: [{ type: String, required: false }],
    weapons: [{ type: String, required: false }],
    technology: [{ type: String, required: false }],
  },
  { timestamps: true, versionKey: false }
);

export default model<IFaction>("factions", FactionSchema);
