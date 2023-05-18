import IDroid from "../interface/droids.interface";
import { model, Schema } from "mongoose";

const DroidSchema = new Schema<IDroid>(
  {},
  { timestamps: true, versionKey: false }
);

export default model<IDroid>("droids", DroidSchema);
