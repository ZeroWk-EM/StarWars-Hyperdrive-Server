import ICharacter from "../interface/characters.interface";
import { model, Schema } from "mongoose";
import { EyeColorEnum } from "../interface/enum/eyecolor.enum";
import { GenderEnum } from "../interface/enum/gender.enum";

const CharacterSchema = new Schema<ICharacter>(
  {
    name: { type: String, required: true },
    surname: { type: String, required: false },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    gender: {
      type: String,
      enum: GenderEnum,
      message:
        "{VALUE} is not supported, see the documentation for see acceptable values",
      required: true,
    },
    hair_color: { type: String, required: false },
    skin_color: { type: String, required: true },
    eye_color: {
      type: String,
      enum: EyeColorEnum,
      message:
        "{VALUE} is not supported, see the documentation for see acceptable values",
      required: true,
    },
    birth_year: { type: String, required: false },
    homeworld: { type: String, required: false },
    factions: [{ type: String, require: false }],
    movies: [{ type: String, required: false }],
    series: [{ type: String, required: false }],
    specie: { type: String, required: true },
    vehicles: [{ type: String, required: false }],
    weapons: [{ type: String, required: false }],
  },
  { timestamps: true, versionKey: false }
);

export default model<ICharacter>("characters", CharacterSchema);
