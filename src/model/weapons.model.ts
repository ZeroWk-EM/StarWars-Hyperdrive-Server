import IWeapons from "../interface/weapons.interface";
import { model, Schema } from "mongoose";

const WeaponsSchema = new Schema<IWeapons>(
  {},
  { timestamps: true, versionKey: false }
);

export default model<IWeapons>("weapons", WeaponsSchema);
