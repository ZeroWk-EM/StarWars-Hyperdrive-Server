import { model, Schema } from "mongoose";
import IUser from "../interface/user.interface";
import { RoleType } from "../interface/enum/role.enum";

const UserSchema = new Schema<IUser>(
  {
    image: { type: String, required: false },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    role: {
      type: String,
      enum: RoleType,
      message:
        "{VALUE} is not supported, see the documentation for see acceptable values",
      required: true,
      default: RoleType.USER,
    },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<IUser>("users", UserSchema);
