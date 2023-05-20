import IFaction from "../interface/factions.interface";
import { model, Schema } from "mongoose";

const FactionSchema = new Schema<IFaction>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    planet: [{ type: String, required: false }],
    weapons: [{ type: String, required: false }],
    technology: [{ type: String, required: false }],
  },
  { timestamps: true, versionKey: false }
);

export default model<IFaction>("factions", FactionSchema);
