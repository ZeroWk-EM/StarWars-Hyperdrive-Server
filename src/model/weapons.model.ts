import { WeaponType } from "../interface/enum/weapontype.enum";
import IWeapons from "../interface/weapons.interface";
import { model, Schema } from "mongoose";

const WeaponsSchema = new Schema<IWeapons>(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: WeaponType,
      message:
        "{VALUE} is not supported, see the documentation for see acceptable values",
      required: true,
    },
    description: { type: String, required: true },
    owner: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export default model<IWeapons>("weapons", WeaponsSchema);
