import IMovie from "../interface/movies.interface";
import { model, Schema } from "mongoose";

const MovieSchema = new Schema<IMovie>(
  {},
  { timestamps: true, versionKey: false }
);

export default model<IMovie>("movies", MovieSchema);
