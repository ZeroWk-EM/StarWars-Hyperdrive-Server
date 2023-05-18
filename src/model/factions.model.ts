import IFaction from "../interface/factions.interface";
import { model, Schema } from "mongoose";

const FactionSchema = new Schema<IFaction>(
  {},
  { timestamps: true, versionKey: false }
);

export default model<IFaction>("factions", FactionSchema);
