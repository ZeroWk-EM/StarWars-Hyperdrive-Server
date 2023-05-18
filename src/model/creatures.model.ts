import ICreature from "../interface/creatures.interface";
import { model, Schema } from "mongoose";

const CreatureSchema = new Schema<ICreature>(
  {},
  { timestamps: true, versionKey: false }
);

export default model<ICreature>("creatures", CreatureSchema);
