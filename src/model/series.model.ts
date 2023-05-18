import ISerie from "../interface/series.interface";
import { model, Schema } from "mongoose";

const SeriesSchema = new Schema<ISerie>(
  {},
  { timestamps: true, versionKey: false }
);

export default model<ISerie>("series", SeriesSchema);
