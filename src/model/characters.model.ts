import ICharacter from "../interface/characters.interface";
import { model, Schema } from "mongoose";

const CharacterSchema = new Schema<ICharacter>(
  { name: { type: String, require: true } },
  { timestamps: true, versionKey: false }
);

export default model<ICharacter>("characters", CharacterSchema);
