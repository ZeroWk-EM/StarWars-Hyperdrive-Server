import { model, Schema } from "mongoose";
import ISerie from "../interface/series.interface";

const SeriesSchema = new Schema<ISerie>(
  {
    title: { type: String, require: true },
    seasons: { type: Number, required: true },
    total_episodes: { type: Number, required: true },
    director: { type: String, required: true },
    producer: { type: String, required: true },
    release_date: { type: Date, required: true },
    end_date: { type: Date, required: false },
    characters: [{ type: String, required: false }],
    droid: [{ type: String, required: false }],
    vehicles: [{ type: String, required: false }],
  },
  { timestamps: true, versionKey: false }
);

export default model<ISerie>("series", SeriesSchema);
