import IVehicles from "../interface/vehicles.interface";
import { model, Schema } from "mongoose";

const VehicleSchema = new Schema<IVehicles>(
  {},
  { timestamps: true, versionKey: false }
);

export default model<IVehicles>("vehicles",VehicleSchema);