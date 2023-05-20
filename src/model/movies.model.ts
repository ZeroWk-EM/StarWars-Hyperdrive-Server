import IMovie from "../interface/movies.interface";
import { model, Schema } from "mongoose";

const MovieSchema = new Schema<IMovie>(
  {
    title: { type: String, require: true },
    episode_id: { type: Number, required: true },
    opening_crawl: { type: String, required: true },
    director: { type: String, required: true },
    producer: { type: String, required: true },
    release_date: { type: Date, required: true },
    characters: [{ type: String, required: false }],
    droid: [{ type: String, required: false }],
    vehicles: [{ type: String, required: false }],
  },
  { timestamps: true, versionKey: false }
);

export default model<IMovie>("movies", MovieSchema);
